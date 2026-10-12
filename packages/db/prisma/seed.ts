import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create sample vehicles
  const vehicle1 = await prisma.vehicle.upsert({
    where: { licensePlate: 'NEMT-001' },
    update: {},
    create: {
      licensePlate: 'NEMT-001',
      vehicleType: 'AUTONOMOUS',
      capacity: 4,
      status: 'AVAILABLE',
    },
  })

  const vehicle2 = await prisma.vehicle.upsert({
    where: { licensePlate: 'NEMT-002' },
    update: {},
    create: {
      licensePlate: 'NEMT-002',
      vehicleType: 'COMPANION_VEHICLE',
      capacity: 4,
      status: 'AVAILABLE',
    },
  })

  const vehicle3 = await prisma.vehicle.upsert({
    where: { licensePlate: 'NEMT-003' },
    update: {},
    create: {
      licensePlate: 'NEMT-003',
      vehicleType: 'WAV',
      capacity: 2,
      status: 'AVAILABLE',
    },
  })

  // Create sample clinic
  const clinic = await prisma.clinic.upsert({
    where: { npiId: '1234567890' },
    update: {},
    create: {
      name: 'General Medical Center',
      npiId: '1234567890',
      address: '123 Medical Center Dr',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      phoneNumber: '217-555-0100',
      email: 'info@generalmedical.com',
    },
  })

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: 'admin@nemtplatform.com' },
    update: {},
    create: {
      email: 'admin@nemtplatform.com',
      passwordHash: '$2b$10$placeholder_hash', // This should be a real bcrypt hash
      role: 'ADMIN',
      firstName: 'System',
      lastName: 'Administrator',
      phoneNumber: '555-0100',
    },
  })

  console.log('Database seed completed successfully')
  console.log({ vehicle1, vehicle2, vehicle3, clinic, user })
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
