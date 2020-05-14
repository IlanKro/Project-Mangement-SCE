const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
const pass_check=require("check-password-strength")


module.exports = function(app,admin) {
    app.get("/homepage_admin",(req, res) => {
        console.log("hello admin")
        res.render("homepage_admin")
    })
}


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
