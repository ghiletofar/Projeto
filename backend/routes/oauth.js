import express from "express"
const Router = express.Router()

Router.get("/callback", async (req, res) => {
  const code = req.query.code
  if (!code) {
    return res.redirect("/login")
  }

  const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_ID,
      client_secret: process.env.TWITCH_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/oauth/callback",
    }),
  })

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  const userResponse = await fetch("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-ID": process.env.TWITCH_ID,
    },
  })

  const userData = await userResponse.json()

  req.session.user = {
    id: userData.data[0].id,
    login: userData.data[0].login,
    displayName: userData.data[0].display_name,
    email: userData.data[0].email,
  }

  res.redirect("/profile")
})

Router.get("/redirect", async (req, res) => {
  const clientID = encodeURI(process.env.TWITCH_ID)
  const redirectUri = encodeURI("http://localhost:3000/oauth/callback")
  const scope = encodeURI("user:read:email")

  const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}`

  res.redirect(url)
})

export default Router
