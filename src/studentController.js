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


    app.get("/homepage_student",(req, res) => {
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews")]).then(data =>
        {
            res.render("homepage_student",{"Units" :data[0],"Users" : data[1],"Reviews" :data[2]})
        })
    })

    app.get("/booking",(req, res) => {
        res.render("booking")
    })

    app.post("/homepage_student/write_review",body_url,(req, res) => {
        console.log(req.body)
        console.log(req.body.renter_id)
        req.body.timestamp = admin.firestore.Timestamp.fromDate(new Date())
        req.body.renter_id=database.collection("Users").doc(req.body.renter_id)
        req.body.student_id=database.collection("Users").doc(req.body.student_id)
        console.log(req.body)
        database.collection("Reviews").add(req.body).then(() =>{
            res.render("message_page",{"message" : "review received successfully!"} )
        }).catch((error) => {
            res.render("message_page",{"message" : error} )
        })
        //res.render("write_review")
    })
    app.post("/homepage_student/order",body_url,(req, res) => {

    })

    app.post("/write_review", body_json, (req, res) => {
        console.log(req.body)
        admin.firestore().collection("Reviews").doc().set()
        res.redirect("homepage_student")
    })
}
