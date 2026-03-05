import dotenv from "dotenv"
import express from "express"
import session from "express-session"
import rotaIndex from "./backend/routes/index.js"
import rotaLogin from "./backend/routes/login.js"
import rotaSignup from "./backend/routes/signup.js"
import rotaProfile from "./backend/routes/profile.js"
import rotaLogout from "./backend/routes/logout.js"
import rotaOauth from "./backend/routes/oauth.js"
const app = express()

dotenv.config()
app.set("view engine", "ejs")
app.set("views", "./backend/views")
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
)

app.use("/", rotaIndex)
app.use("/login", rotaLogin)
app.use("/signup", rotaSignup)
app.use("/profile", rotaProfile)
app.use("/logout", rotaLogout)
app.use("/oauth", rotaOauth)

app.use((req, res) => {
  res.status(404).send(viewErrorPage)
})

app.listen(process.env.PORT || 3000, () =>
  console.log("App disponivel on http://localhost:3000"),
)
