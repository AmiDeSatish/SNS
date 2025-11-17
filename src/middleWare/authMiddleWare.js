import express from "express"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

async function authMiddleWare(req,res,next){
  console.log("AuthMiddleWare is checking")
  const token = req.cookies.token
  jwt.verify(token,process.env.JWT_SECRET, (err,decoded) =>{
    if(err){
      return res.status(401).json({message : "Token is invalid"})
    }
    
    // Add id in the request
    req.id = decoded.id
    res.status(200).send("Valid token")
    next()
  })
}

export default authMiddleWare