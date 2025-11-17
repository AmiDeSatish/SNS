import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
let route = express.Router()

// 1 : POST (Register a new user)
route.post("/register", async(req,res) =>{

  // Get the data from the body of the request
  const {bName,bLastName,bEmail,bPassword} = req.body
  // Encryption of the password
  const encrypted = bcrypt.hashSync(bPassword,10)
  // Add them in the database
  try{
    const user = await prisma.user.create({
      data : {
        name : bName,
        lastName : bLastName,
        email : bEmail,
        password : encrypted
      }
    })

    // Creation of a token (payload, key, expiresIn)
    const token = jwt.sign({id : user.id},process.env.JWT_SECRET,{expiresIn : "2d"})
    // Stock the token in the coockie of the page that asks
    res.cookie("token",token,{
      maxAge : 172800000,
      httpOnly : true 
    })
    res.status(201).json({
      success : true
    })
  }
  catch(err){
    res.status(500).send("Error with the registration of a new user")
    console.error(err)
  }
})

export default route