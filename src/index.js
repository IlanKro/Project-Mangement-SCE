const express  = require("express")
const app_port = process.env.PORT || 3000
const path= require("path")
const logger=require("morgan")
const app = express()
const user_controller= require("./userController")
const admin= require("./firebase-admin")()

// express settings:
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "/views/")))
app.set("views",__dirname+"/views/")
app.use("/",express.static("js"))
app.use("/css",express.static("css"))
app.use(express.static("./") )
app.use(logger("dev"))


//homepage:
app.get("/",(req, res) => {
    res.render("index", {title: "hello user"})
})

var database=admin.firestore()
let details= {
    usertype: "renter",
    email: "renter@rent.com",
    pass: "money!qweWQ!@Qw1",
    username: "21",
    fname: "231",
    email: "rent@redfg.com",
    username: "231",
    fname: "321",
    lname: "321",
    bank: "213321",
    img: "",
    //uid: "NmsN5Ls2OQUJNyGrmnwpnDG6OsJ2"
}
database.collection("Users").doc("NmsN5Ls2OQUJNyGrmnwpnDG6OsJ2").set(details)


/*
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


user_controller(app,admin)
app.listen(app_port)
console.log(`app is running. port: ${app_port}`)
console.log(`http://127.0.0.1:${app_port}/`)
