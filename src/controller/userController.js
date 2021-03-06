const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
/* this controls pages that have to do with user logon and management */
module.exports = function(app,admin) {
    const database= admin.firestore()
    login(app,admin,database) 
    signup(app,admin,database)
}

function login(app,admin,database) {
    app.get("/login",(req, res) => {
        res.render("login")
    })
    app.get("/forgotpassword",(req, res) => {
        res.render("forgotpassword")
    })
    app.post("/login",body_json, (req,res) => {
        admin.firestore().collection("Users").doc(req.body.uid).get()
            .then(doc => {
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

function signup(app,admin,database) {
    app.get("/signup",(req, res) => {
        res.render("signup")
    })
    app.post("/signup",body_json, (req,res) => {
        delete req.body.pass //no need to store password it's stored on auth.
        delete req.body.checkbox //no need to store the same data in every user.
        database.collection("Users").doc(req.body.uid).set(req.body).then(() => {
            //disabling student user until they are accepted
            if (req.body.usertype=="student")
                admin.auth().updateUser(req.body.uid, {disabled: true})
            admin.auth().updateUser(req.body.uid, {displayName: req.body.username})
            res.render("message_page",{"message":"user created successfully"})
        }).catch(function(error) {
            console.log("Error: ", error)
            res.render("message_page",{"message" : error})
        })
    })
}
