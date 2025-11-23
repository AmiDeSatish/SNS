import { PrismaClient } from "@prisma/client";
import { products } from "./data/collection1/products.js";
import { VarianteGeneration } from "./data/varianteGeneration.js"; 

const prisma = new PrismaClient()

async function main() {
  console.log("SEED START")
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        brand: product.brand,
        sexe : product.sexe ?? "Unisex",
        type: product.type,
      },
    });

    await VarianteGeneration(createdProduct,prisma);
  }
}
main()
  .catch(err=>{
    console.log(err);
  })
  .finally(async() => {
    await prisma.$disconnect()
  })