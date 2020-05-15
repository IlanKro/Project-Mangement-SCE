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

        admin.auth().updateUser(req.body.uid, {displayName: req.body.username})
    })

    app.post("/login",body_json, (req,res) => {
        console.log(req.body.uid)
        admin.firestore().collection("Users").doc(req.body.uid).get()
            .then(doc => {
                console.log(doc.data().usertype)
                let user_type= doc.data().usertype
                if (user_type == "student")
                    return res.redirect("homepage_student")
                else if (user_type == "renter")
                    return  res.redirect("homepage_renter")
                else if (user_type == "admin")
                    return res.redirect("homepage_admin")
                else
                    return res.redirect("404")
            })
            .catch(err => {
                console.log(err)
            })
    })
}
