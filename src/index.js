const express  = require("express")
const app_port = process.env.PORT || 3000
const path= require("path")
const app = express()
//controllers:
const user_controller= require("./controller/userController")
const admin_controller= require("./controller/adminController")
const student_controller= require("./controller/studentController")
const renter_controller= require("./controller/renterController")
//firebase admin SDK for serverside management.
const admin= require("./firebase/firebase-admin")()
// express settings:
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "/views/")))
app.set("views",__dirname+"/views/")
app.use("/",express.static("js"))
app.use("/css",express.static("css"))
app.use(express.static("./") )
//homepage:
app.get("/",(req, res) => {
    res.render("index",{title: "SCE room"})
})
// render page not found.
app.get("/404",(req, res) => {
    res.render("404")
})
//activating controllers:
user_controller(app,admin)
admin_controller(app,admin)
student_controller(app,admin)
renter_controller(app,admin)
//activating server:
app.listen(app_port)
console.log(`app is running. port: ${app_port}`)
console.log(`http://127.0.0.1:${app_port}/`)
