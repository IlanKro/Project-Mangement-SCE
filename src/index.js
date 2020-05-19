const express  = require("express")
const app_port = process.env.PORT || 3000
const path= require("path")
const logger=require("morgan")
const app = express()
const user_controller= require("./controller/userController")
const admin_controller= require("./controller/adminController")
const student_controller= require("./controller/studentController")
const renter_controller= require("./controller/renterController")
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
    res.render("index",{title: "hello"})
})
app.get("/404",(req, res) => {
    res.render("404")
})


user_controller(app,admin)
admin_controller(app,admin)
student_controller(app,admin)
renter_controller(app,admin)
app.listen(app_port)
console.log(`app is running. port: ${app_port}`)
console.log(`http://127.0.0.1:${app_port}/`)




/* maybe usable code:
  console.log(admin.app().name)

  admin.auth().createUser({
    email: "user@example.com",
    emailVerified: false,
    phoneNumber: ""+11234567890",
    password: "secretPassword",
    displayName: "John Doe",
    disabled: false
  })
  */
/*
  admin.auth().getUser("X6QC83OvQue3oRaMQ9kULihnKN73")
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully fetched user data:", userRecord.toJSON())
    })
    .catch(function(error) {
        console.log("Error fetching user data:", error)
  });
  */
/*
 function firebaseGetUserAttr(admin,uid,attr) {
     admin.firestore().collection("Users").doc(uid).get()
         .then(doc => {
             console.log(doc.data().attr)
         })
         .catch(err => {
             console.log(err)
         })
 }
 */
