const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()

/* this controls pages that have to do with renter */
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

}
