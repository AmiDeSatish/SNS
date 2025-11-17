import express from "express"
import path from "path"
import {fileURLToPath} from "url"
import cookieParser from "cookie-parser"

import productsRoute from "./routes/productsRoutes.js"
import authRoutes from "./routes/authRoutes.js"

import authMiddleWare from "./middleWare/authMiddleWare.js"
 
// Get the static files path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const StaticFiles = path.join(__dirname,"../public")

 // Important const for the app settings
const app = express()
const PORT = 5200

// 1 : Global middleware
app.use(express.json())
app.use(express.static(StaticFiles))
app.use(cookieParser())               //Allow to read cookies

// 2 : Organiser les routes
app.use("/api/products",productsRoute)
app.use("/api/auth",authRoutes)

app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname,"../public/html","home.html"))
})
app.get("/api/userSpace",authMiddleWare,(req,res) =>{
  res.status(200).sendFile(path.join(__dirname,"/views/userSpace.html"))
})

app.listen(PORT, () => {
  console.log("App is listening on port 5200")
})