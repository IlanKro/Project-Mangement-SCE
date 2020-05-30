const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()

/* this controls pages that have to do with student */
module.exports = function(app,admin) {
    const database= admin.firestore()
    async function getLibrary(library) {
        /* async function to get complete library, returns promise with the library */
        return database.collection(library).get().then(doc => {
            return doc.docs
        })
    }

    app.get("/homepage_student",(req, res) => {
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews"),getLibrary("Attractions")]).then(data =>
        {
            res.render("homepage_student",{"Units" :data[0],"Users" : data[1],"Reviews" :data[2], "Attractions" : data[3]})
        })
    })

    app.post("/homepage_student/order",body_url,(req, res) => {
        database.collection("Units").doc(req.body.unitID).get().then((unit) => {
            res.render("booking",{unit: unit})
        }).catch((error) => {
            res.render("message_page",{"message" : error} )
        })

    })

    app.post("/booking",body_url,(req, res) => {
        req.body.timestamp = admin.firestore.Timestamp.fromDate(new Date())
        req.body.student_id=database.collection("Users").doc(req.body.student_id)
        req.body.unit_id = database.collection("Units").doc(req.body.unit_id)
        req.body.accepted= false //add a field if the order is accepted or not for the renter to change if it is.
        database.collection("Orders").add(req.body).then(() =>{
            //BUG! does not redirect properly..
            res.render("transaction",{"message" :"order: " +  req.body.transaction_id + " received successfully!"} )
        }).catch((error) => {
            res.render("transaction",{"message" : error} )
        })
    })

    app.post("/homepage_student/write_review",body_url,(req, res) => {

        req.body.timestamp = admin.firestore.Timestamp.fromDate(new Date())
        req.body.renter_id=database.collection("Users").doc(req.body.renter_id)
        req.body.student_id=database.collection("Users").doc(req.body.student_id)
        console.log(req.body)
        database.collection("Reviews").add(req.body).then(() =>{
            res.render("message_page",{"message" : "review received successfully!"} )
        }).catch((error) => {
            res.render("message_page",{"message" : error} )
        })
    })
}
