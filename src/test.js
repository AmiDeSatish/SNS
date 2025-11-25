import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

async function main(){
  const result = await prisma.catalogue.findMany();
  console.log("result  : ", result)
}

main()
  .catch(err=>{
    console.log(err);
  })
  .finally(async() => {
    await prisma.$disconnect()
  })