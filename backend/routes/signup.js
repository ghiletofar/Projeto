import express from "express"
import { userCollection } from "../services/database.js"
import bcrypt from "bcrypt"
const Router = express.Router()

Router.post("/", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  }

  const existingUser = await userCollection.findOne({ name: data.name })

  if (existingUser) {
    res.send(`Esse nome ja foi utilizado com a senha ${existingUser.password}`)
  } else {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)

    data.password = hashedPassword

    const userdata = await userCollection.insertMany(data)
    res.redirect("/login")
  }
})

Router.get("/", async (req, res) => {
  res.render("signup")
})

export default Router
