all the stuff here is not in use anymore but can be used since there was work done here and part of the code is good.. just not enough..
now working with node js...


const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "false"})
module.exports = function(app) {

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
        console.log("hello")
    })

    app.post("/signup",body_url, (req,res) => {
        console.log(req.body)
    })

    app.post("/forgotpassword",body_url, (req,res) => {
        console.log(req.body)
    })