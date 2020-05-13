const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "false"})
const pass_check=require("check-password-strength")
/*
function isLoggedIn (req, res, next)
{
    if (req.isAuthenticated()) {
        res.status(200).send("Welcome")
    } else {
        res.status(401).send("You are not allowed")
    }
}
*/

function checkLoggedIn(request, resposense, next) {// if user is authenticated in the session, carry on
    if (request.isAuthenticated())
        return next()// if they aren't redirect them to the index page
    resposense.redirect("/")
}


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

    app.post("/login",(req,res) => {
        console.log("logged in")

        //TODO: make this code below to work
        /*
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            window.alert("Error : " + error.message)
        })
        */
    })
    app.post("/signup",body_url, (req,res) => {
        let database=admin.database()
        console.log(req.body)
        console.log(req.body.email + req.body.pass + " " )
        //actual name: req.body.fname + " " + req.body.lname,
        //TODO:find a way to add those 2, the image, the bank account and USER TYPE!!
        console.log(pass_check(req.body.pass))
        if (pass_check(req.body.pass).value!="Weak") //change to strong
        {
            res.send({ success: false, error: "password not strong enough! read the instructions and try again."})
        }
        else {
            res.send(req.body) //send back the signup
            /*
            admin.auth().createUser({
                email: req.body.email,
                emailVerified: false,
                password: req.body.password,
                disabled: false,
                displayName: req.body.username
            }).then(cred => {
                console.log(cred)
                res.send({message: "user created successfully", success: true })
            }).catch(error => {
                console.log(error.code)
            })
            */
        }

    })

    app.post("/forgotpassword",body_url, (req,res) => {
        console.log(req.body)
    })
}
