import express from "express"
const Router = express.Router()

Router.get("/", async (req, res) => {
  res.render("index")
})

export default Router
