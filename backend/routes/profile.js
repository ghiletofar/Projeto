import express from "express"
const Router = express.Router()

function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login")
  }
  next()
}

Router.get("/", authMiddleware, async (req, res) => {
  res.render("profile")
})

export default Router
