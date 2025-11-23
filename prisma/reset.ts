import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// CAUTIOUS FILE : Delete all the data from product and catalogue
async function reset() {
  await prisma.catalogue.deleteMany();
  await prisma.product.deleteMany();
}

reset()
  .then(() => {
    console.log("Database reset complete.");
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
