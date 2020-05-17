const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()

module.exports = function(app,admin) {
    const database= admin.firestore()
    async function getLibrary(library) {
        /* async function to get complete library, returns promise with the library */
        return database.collection(library).get().then(doc => {
            return doc.docs
        })
    }
    
    app.get("/homepage_renter",(req, res) => {
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews"),getLibrary("Orders")]).then(data =>
        {
            res.render("homepage_renter",{"Units" :data[0],"Users" : data[1],"Reviews" :data[2]})
        })
    })

    app.post("/homepage_renter/post_housing_unit",body_url, (req,res) => {
        req.body.available= true
        req.body.student= null
        console.log("New unit added:\n" + req.body)
        req.body.user_id=database.collection("Users").doc(req.body.user_id)
        database.collection("Units").add(req.body).then(() => {
            res.render("message_page",{"message" : req.body.street + " "
            + req.body.house_number + " " + req.body.city + " listed"})
        })
    })
    /*

    app.post("/homepage_admin/ban",body_url, (req,res) => {
        admin.auth().updateUser(req.body.uid, {disabled: true})
            .then(function(userRecord) {
                console.log("Successfully enabled user data:", userRecord.toJSON())
                res.render("success_page",{"success" : userRecord.email + " banned!"} )
            })
            .catch(function(error) {
                console.log("Error fetching user data:", error)
                res.send(error)
            })
    })
    app.post("/homepage_admin/unban",body_url, (req,res) => {
        admin.auth().updateUser(req.body.uid, {disabled: false})
            .then(function(userRecord) {
                console.log("Successfully enabled user data:", userRecord.toJSON())
                res.render("success_page",{"success" : userRecord.email + " activated!"} )
            })
            .catch(function(error) {
                console.log("Error fetching user data:", error)
                res.send(error)
            })
    })
    app.post("/homepage_admin/rmv_review",body_url, (req,res) => {
        //console.log(req.body)
        res.render("success_page",{"success" : req.body.rid + " deleted!"} )
    })
*/

}
