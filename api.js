import { readFile } from "fs"
import express from "express"
import path from "path"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express()
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "1.0.0.1"])

app.use(express.json())
app.use(express.static(import.meta.dirname))
dotenv.config()

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Conectado ao MongoDB")
  } catch (error) {
    console.log("Erro na conexão com o MongoDB. Erro:", error)
  }
}

connectDb()

app.get("/", (request, response) => {
  readFile("./index.html", "utf8", (err, html) => {
    if (err) {
      response.status(500).send("algo deu errado :/")
    }

    response.send(html)
  })
})

app.listen(process.env.PORT || 3000, () =>
  console.log("App disponivel on http://localhost:3000"),
)
