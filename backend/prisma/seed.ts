import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // ── 1. Wipe existing seed data so the script is re-runnable ──────────────
  await prisma.billingRecord.deleteMany()
  await prisma.registrationRequest.deleteMany()
  await prisma.clientProfile.deleteMany()

  // ── 2. Auth accounts ─────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash('Admin@2026!', 12)
  const userHash  = await bcrypt.hash('User@2026!',  12)

  await prisma.account.upsert({
    where:  { email: 'admin@flowtech.africa' },
    update: { passwordHash: adminHash, role: 'ADMIN' },
    create: { name: 'FlowTech Admin', email: 'admin@flowtech.africa', passwordHash: adminHash, role: 'ADMIN' },
  })

  await prisma.account.upsert({
    where:  { email: 'user@flowtech.africa' },
    update: { passwordHash: userHash, role: 'USER' },
    create: { name: 'Test User', email: 'user@flowtech.africa', passwordHash: userHash, role: 'USER' },
  })

  // ── 2. Client profiles ───────────────────────────────────────────────────
  const amara = await prisma.clientProfile.create({
    data: {
      email: 'amara.dlamini@horizonventures.co.za',
      name: 'Amara Dlamini',
      organizationName: 'Horizon Ventures (Pty) Ltd',
    },
  })

  const kofi = await prisma.clientProfile.create({
    data: {
      email: 'kofi.mensah@tekpulsegh.com',
      name: 'Kofi Mensah',
      organizationName: 'TekPulse Ghana Ltd',
    },
  })

  const naledi = await prisma.clientProfile.create({
    data: {
      email: 'naledi.sithole@greenlinkagri.co.za',
      name: 'Naledi Sithole',
      organizationName: 'GreenLink Agri Solutions',
    },
  })

  // ── 3. Registration requests ─────────────────────────────────────────────
  const amaraReq = await prisma.registrationRequest.create({
    data: {
      type: 'Company Registration',
      status: 'Pending',
      trackingNumber: 'FT-2026-0001',
      clientProfileId: amara.id,
    },
  })

  const kofiReq = await prisma.registrationRequest.create({
    data: {
      type: 'Tax Setup',
      status: 'Under Review',
      trackingNumber: 'FT-2026-0002',
      clientProfileId: kofi.id,
    },
  })

  const nalediReq = await prisma.registrationRequest.create({
    data: {
      type: 'BBEE Certification',
      status: 'Processed',
      trackingNumber: 'FT-2026-0003',
      clientProfileId: naledi.id,
    },
  })

  // ── 4. Billing records (amounts in cents) ────────────────────────────────
  // Company Registration — R 2 500.00 → 250 000 cents, invoice Draft
  await prisma.billingRecord.create({
    data: {
      amount: 250_000,
      currency: 'ZAR',
      invoiceStatus: 'Draft',
      registrationRequestId: amaraReq.id,
    },
  })

  // Tax Setup — R 1 800.00 → 180 000 cents, invoice Issued
  await prisma.billingRecord.create({
    data: {
      amount: 180_000,
      currency: 'ZAR',
      invoiceStatus: 'Issued',
      registrationRequestId: kofiReq.id,
    },
  })

  // BBEE Certification — R 3 750.00 → 375 000 cents, invoice Paid
  await prisma.billingRecord.create({
    data: {
      amount: 375_000,
      currency: 'ZAR',
      invoiceStatus: 'Paid',
      registrationRequestId: nalediReq.id,
    },
  })

  // ── 6. Summary ───────────────────────────────────────────────────────────
  const counts = {
    clients: await prisma.clientProfile.count(),
    requests: await prisma.registrationRequest.count(),
    billing: await prisma.billingRecord.count(),
    accounts: await prisma.account.count(),
  }

  console.log('\n✅ Seed complete')
  console.log(`   ClientProfile       → ${counts.clients} records`)
  console.log(`   RegistrationRequest → ${counts.requests} records`)
  console.log(`   BillingRecord       → ${counts.billing} records`)
  console.log(`   Account             → ${counts.accounts} records\n`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
