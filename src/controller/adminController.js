const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
/* this controls pages that have to do with admin */

module.exports = function(app,admin) {
    const database= admin.firestore()
    async function getLibrary(library) {
        /* async function to get complete library, returns promise with the library */
        return database.collection(library).get().then(doc => {
            return doc.docs
        })
    }

    app.get("/homepage_admin",(req, res) => {
        /* homepage, loads all the relevant libraries into the page */
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews")]).then(data =>
        {
            res.render("homepage_admin",{"Units" :data[0],"Users" : data[1],"Reviews" :data[2]})
        })
    })

    app.post("/homepage_admin/ban",body_url, (req,res) => {
        /* disables a user */
        admin.auth().updateUser(req.body.uid, {disabled: true})
            .then(function(userRecord) {
                res.render("message_page",{"message" : userRecord.email + " banned!"} )
            })
            .catch(function(error) {
                console.log("Error fetching user data:", error)
                res.render("message_page",{"message" : error} )
            })
    })
    app.post("/homepage_admin/enable",body_url, (req,res) => {
        /* enables a user */
        admin.auth().updateUser(req.body.uid, {disabled: false})
            .then(function(userRecord) {
                res.render("message_page",{"message" : userRecord.email + " activated!"} )
            })
            .catch(function(error) {
                console.log("Error fetching user data:", error)
                res.render("message_page",{"message" : error} )
            })
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
