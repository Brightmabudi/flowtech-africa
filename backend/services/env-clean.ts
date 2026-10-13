// Vercel/dashboard copy-paste often leaves surrounding quotes or whitespace on values.
// Clean them so a pasted `"password "` still authenticates.
export function cleanEnv(name: string): string | undefined {
  const raw = process.env[name]
  if (raw === undefined) return undefined
  const value = raw.trim().replace(/^["']+|["']+$/g, '').trim()
  return value || undefined
}
