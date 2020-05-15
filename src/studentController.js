const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
const pass_check=require("check-password-strength")

module.exports = function(app,admin) {
    const database= admin.firestore()

    app.get("/login",(req, res) => {
        res.render("login")
    })

    app.get("/signup",(req, res) => {
        res.render("signup")
    })

    app.get("/homepage_student",(req, res) => {
        res.render("homepage_student")
    })

    app.get("/write_review",(req, res) => {
        res.render("write_review")
    })


    app.post("/write_review", body_url, (req, res) => {
        console.log(req.body)
        database.collection("Reviews").doc(req.body.uid).set()
        res.redirect("homepage_student")
    })
}