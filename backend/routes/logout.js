import express from "express"
const Router = express.Router()

Router.get("/", async (req, res) => {
  req.session.destroy()
  res.redirect("/login")
})

export default Router
