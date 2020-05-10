const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "false"})
module.exports = function(app) {
    
    app.get("/login",(req, res) => {
        res.render("login")
    })

    app.post("/login",body_url, (req,res) => {
        console.log(req.body)
    })
    
}