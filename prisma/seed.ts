import { PrismaClient } from "@prisma/client";
import { products } from "./products.js"; 

const prisma = new PrismaClient()
async function main(){
  for(const pro of products){
    await prisma.product.create({
      data : pro
    })
  }
}

main()
  .catch(err=>{
    console.log(err);
  })
  .finally(async() => {
    await prisma.$disconnect()
  })