import express from "express"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const route = express.Router()

// Select and return all the data from model Product
route.get("/info-products-home", async(req,res) => {
  try{
    const data = await prisma.product.findMany({
      relationLoadStrategy : 'join',
      take : 10,
      orderBy : {date : "desc"},
      select:{
        id : true,
        name : true,
        brand :true,
        catalogue : {
          take : 1,
          orderBy : {id : "asc"},
          select : {
            id : true,
            price : true,
            image :true,
          },
        }
      }
    })

    res.json(data)
  } catch(err){
    console.log("Error in productRoutes /infos")
    console.error(err)
    res.status(500).send("Server error")
  }
})

export default route