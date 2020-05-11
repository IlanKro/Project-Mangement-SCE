const express  = require("express")
const app_port = process.env.PORT || 3000
const app = express()
const user_controller= require("./userController")

app.set("view engine", "ejs")
app.use(express.static("css") )
app.use(express.static("images") )

app.get("/",(req, res) => {
    res.render("index")
})
user_controller(app)
app.listen(app_port)
console.log(`app is running. port: ${app_port}`)
console.log(`http://127.0.0.1:${app_port}/`)
