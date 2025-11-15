import express from "express"
import path from "path"
import {fileURLToPath} from "url"
 
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

app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname,"../public/html","home.html"))
})

app.listen(PORT, () => {
  console.log("App is listening on port 5200")
})