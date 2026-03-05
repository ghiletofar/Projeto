import mongoose from "mongoose"
import dotenv from "dotenv"
import dns from "node:dns/promises"

dns.setServers(["1.1.1.1", "1.0.0.1"])
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

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const userCollection = new mongoose.model("usuarios", LoginSchema)

export { userCollection }
