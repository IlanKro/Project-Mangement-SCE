const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
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
/*
function checkLoggedIn(request, resposense, next) {// if user is authenticated in the session, carry on
    if (request.isAuthenticated())
        return next()// if they aren't redirect them to the index page
    resposense.redirect("/")
}
*/


module.exports = function(app,admin) {
    const database= admin.firestore()
    app.get("/login",(req, res) => {
        res.render("login")
    })

    app.get("/signup",(req, res) => {
        res.render("signup")
    })

    app.get("/forgotpassword",(req, res) => {
        res.render("forgotpassword")
    })
    app.post("/signup",body_json, (req,res) => {
        delete req.body.pass //no need to store password it's stored on auth.
        delete req.body.checkbox //no need to store the same data in every user.
        database.collection("Users").doc(req.body.uid).set(req.body)
        if (req.body.usertype=="student")
        //disabling user until they are accepted
            admin.auth().updateUser(req.body.uid, {disabled: true})
        admin.auth().updateUser(req.body.uid, {
            displayName: req.body.username
        })
    })

    app.post("/login",body_json, (req,res) => {
        admin.firestore().collection("Users").doc(req.body.uid).get()
            .then(doc => {
                let user_type= doc.data().user_type
                if (user_type == "student")
                    return res.render(303,"homepage_student")
                else if (user_type == "renter")
                    return  res.render(303,"homepage_renter")
                else if (user_type == "admin")
                    return res.render(303,"homepage_admin")
                else
                    return res.render(303,"404")
            })
            .catch(err => {
                console.log(err)
            })

    })

    app.post("/forgotpassword",body_url, (req,res) => {
        console.log(req.body)
    })

}



/*
console.log(pass_check(req.body.pass))
if (pass_check(req.body.pass).value!="Weak") //change to strong
{
    res.send({ success: false, error: "password not strong enough! read the instructions and try again."})
}
else {
    res.render("signup",req.body) //send back the signup
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

}
*/
