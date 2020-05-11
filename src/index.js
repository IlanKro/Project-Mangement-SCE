const express  = require("express")
const app_port = process.env.PORT || 3000
const app = express()
const user_controller= require("./userController")
const admin= require("./firebase")()
//const admin=admin1()
app.set("view engine", "ejs")

app.use("/css",express.static("css"))
app.use(express.static("images") )

app.get("/",(req, res) => {
    res.render("index", {title: "hello user"})
})
console.log(admin.app().name)
/*
admin.auth().createUser({
  email: 'user@example.com',
  emailVerified: false,
  phoneNumber: '+11234567890',
  password: 'secretPassword',
  displayName: 'John Doe',
  disabled: false
})
*/

admin.auth().getUser("OqKjlolzjQPTDDKCzxYhfiLR4wI2")
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data:', userRecord.toJSON());
  })
  .catch(function(error) {
    console.log('Error fetching user data:', error);
});



user_controller(app,admin)
app.listen(app_port)
console.log(`app is running. port: ${app_port}`)
console.log(`http://127.0.0.1:${app_port}/`)
