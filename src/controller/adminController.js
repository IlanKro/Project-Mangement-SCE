const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
getLibraries= require("./getLibrary")
/* this controls pages that have to do with admin */
module.exports = function(app,admin) {
    const database= admin.firestore()

    app.get("/homepage_admin",(req, res) => {
        /* homepage, loads all the relevant libraries into the page */
        Promise.all(getLibraries(admin,["Units","Users","Reviews"])).then(data =>
        {
            res.render("homepage_admin",{"Units" :data[0],"Users" : data[1],"Reviews" :data[2]})
        })
    })
    app.post("/homepage_admin/ban",body_url, (req,res) => {
        /* disables a user */
        ChangeUserState(admin,req,res,true," banned!")
    })

    app.post("/homepage_admin/enable",body_url, (req,res) => {
        /* enables a user */
        ChangeUserState(admin,req,res,false," activated!")
    })
    app.post("/homepage_admin/rmv_review",body_url, (req,res) => {
        /* removes a review from database*/
        database.collection("Reviews").doc(req.body.rid).delete().then(function() {
            res.redirect("/homepage_admin")
        }).catch(function(error) {
            res.render("message_page",{"message" : error} )
        })
    })
}

// change the stae of a user: enabled/disabled, true for disabled, false for enabled.
//req should have the user id, res is the respounce, state is the state to change to,
//and the message is which message to display for the user
function ChangeUserState(admin,req,res,state,message) {
    admin.auth().updateUser(req.body.uid, {disabled: state})
        .then(function(userRecord) {
            res.render("message_page",{"message" : userRecord.email + message} )
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error)
            res.render("message_page",{"message" : error} )
        })
}
