import express from "express"

const app = express()
const PORT = 5200

app.listen(PORT, () => {
  console.log("App is listening on port 5200")
})