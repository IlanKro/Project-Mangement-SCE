const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "false"})

module.exports = function(app,admin) {

    app.get("/login",(req, res) => {
        res.render("login")
    })

    app.get("/signup",(req, res) => {
        res.render("signup")
    })

    app.get("/forgotpassword",(req, res) => {
        res.render("forgotpassword")
    })

    app.post("/login",body_url, (req,res) => {
        console.log(req.body)
        let email= req.body.email
        let password= req.body.password
        //TODO: make this code below to work
        /*
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            window.alert("Error : " + error.message)
        })
        */
    })
    app.post("/signup",body_url, (req,res) => {
        console.log(req.body)
        console.log(req.body.email + req.body.pass + " " )
          //actual name: req.body.fname + " " + req.body.lname,
          //TODO:find a way to add those 2, the image, the bank account and USER TYPE!!
        admin.auth().createUser({
          email: req.body.email,
          emailVerified: false,
          password: req.body.password,
          disabled: false,
          displayName: req.body.username
        })

    })

    app.post("/forgotpassword",body_url, (req,res) => {
        console.log(req.body)
    })
}
