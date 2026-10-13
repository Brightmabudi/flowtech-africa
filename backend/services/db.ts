import { PrismaClient } from '@prisma/client'

// Neon auto-suspends idle compute and closes its connections, so the first query
// after an idle spell can fail with "terminating connection due to administrator
// command" (E57P01 / P1017). Retry those once or twice; Prisma reconnects on retry.
const RETRY_CODES = new Set(['P1001', 'P1002', 'P1017', 'P2024', 'P2037'])
const RETRY_PATTERN = /E57P01|terminating connection|Server has closed the connection|Connection (reset|terminated)|Can't reach database server|ECONNRESET|prepared statement|too many (clients|connections)|Max client connections|Timed out fetching a new connection/i
const MAX_RETRIES = 2

function isConnectionError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false
  const { code, message } = error as { code?: string; message?: string }
  return (code !== undefined && RETRY_CODES.has(code)) || RETRY_PATTERN.test(message ?? '')
}

function createClient() {
  return new PrismaClient({ log: ['error'] }).$extends({
    query: {
      async $allOperations({ args, query }) {
        for (let attempt = 0; ; attempt++) {
          try {
            return await query(args)
          } catch (error) {
            if (attempt >= MAX_RETRIES || !isConnectionError(error)) throw error
            await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)))
          }
        }
      },
    },
  })
}

const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createClient> }

export const prisma = globalForPrisma.prisma ?? createClient()

// Reuse one client per serverless instance (and across dev hot-reloads).
globalForPrisma.prisma = prisma
