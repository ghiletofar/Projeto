import express from "express"
import { userCollection } from "../services/database.js"
import bcrypt from "bcrypt"
const Router = express.Router()

function alreadyLogged(req, res, next) {
  if (req.session.user) {
    return res.redirect("/profile")
  }
  next()
}

Router.post("/", async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/profile")
    }

    const checkUser = await userCollection.findOne({
      name: req.body.username,
    })

    if (!checkUser) {
      req.session.errorUser = "Usuario não existe"
      return res.redirect("/login")
    }

    const isPasswordCheck = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    )

    if (isPasswordCheck) {
      req.session.user = {
        id: checkUser._id,
        name: checkUser.name,
      }
      res.redirect("/profile")
    } else {
      req.session.errorPassword = "Senha incorreta"
      res.redirect("/login")
    }
  } catch (err) {
    console.log(err)
    res.redirect("/login")
  }
})

Router.get("/", alreadyLogged, async (req, res) => {
  const errorUser = req.session.errorUser
  const errorPassword = req.session.errorPassword

  req.session.errorUser = null
  req.session.errorPassword = null

  res.render("login", {
    errorUser,
    errorPassword,
  })
})

export default Router
