import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({ where: { username: 'admin' }, update: {}, create: { name: 'Administrador', username: 'admin', passwordHash, role: Role.ADMIN } });
  const city = await prisma.city.upsert({ where: { name: 'Canapi' }, update: {}, create: { name: 'Canapi' } });
  const neighborhood = await prisma.neighborhood.upsert({ where: { cityId_name: { cityId: city.id, name: 'Centro' } }, update: {}, create: { cityId: city.id, name: 'Centro' } });
  await prisma.cycle.upsert({ where: { neighborhoodId_number: { neighborhoodId: neighborhood.id, number: 1 } }, update: {}, create: { neighborhoodId: neighborhood.id, number: 1 } });
  for (let i = 1; i <= 12; i++) await prisma.block.upsert({ where: { neighborhoodId_number: { neighborhoodId: neighborhood.id, number: String(i).padStart(2, '0') } }, update: {}, create: { neighborhoodId: neighborhood.id, number: String(i).padStart(2, '0') } });
}
main().finally(() => prisma.$disconnect());
