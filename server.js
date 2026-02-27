const { readFile } = require("fs")
const express = require("express")
const path = require("path")
const app = express()

app.use(express.static(__dirname))

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
