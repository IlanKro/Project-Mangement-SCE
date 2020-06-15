const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
getLibraries= require("./getLibrary")

/* this controls pages that have to do with renter */
module.exports = function(app,admin) {
    const database= admin.firestore()
    app.get("/homepage_renter",(req, res) => {
        Promise.all(getLibraries(admin,["Attractions"])).then((data) => {
            res.render("homepage_renter",{"Attractions": data[0]})
        })
    })

    app.post("/homepage_renter/manage",body_url,(req, res) => {
        Promise.all(getLibraries(admin,["Units","Users","Orders"])).then(data =>
        {
            res.render("manageHousingUnits",{"Units" :data[0],"Users" : data[1],"Orders" :data[2], "user_id": req.body.user_id})
        }).catch((err) => {
            console.log(err)
            res.render("message_page",{"message": err})
        })
    })

    app.post("/homepage_renter/user_reviews",body_url,(req, res) => {
        Promise.all(getLibraries(admin,["Users","Reviews"])).then(data =>
        {
            res.render("user_reviews",{"Users" : data[0],"Reviews" :data[1], "user_id": req.body.user_id})
        }).catch((err) => {
            console.log(err)
            res.render("message_page",{"message": err})
        })
    })

    app.post("/homepage_renter/your_orders",body_url,(req, res) => {
        Promise.all(getLibraries(admin,["Units","Users","Orders"])).then(data =>
        {
            res.render("your_orders",{"Units" : data[0], "Users" : data[1],"Orders" :data[2], "user_id": req.body.user_id})
        }).catch((err) => {
            console.log(err)
            res.render("message_page",{"message": err})
        })
    })

    app.post("/homepage_renter/statistics",body_url,(req, res) => {
        Promise.all(getLibraries(admin,["Units","Users","Orders"])).then(data =>
        {
            res.render("statistics",{"Units" : data[0], "Users" : data[1],"Orders" :data[2], "user_id": req.body.user_id})
        }).catch((err) => {
            console.log(err)
            res.render("message_page",{"message": err})
        })
    })

    app.post("/homepage_renter/post_housing_unit",body_json, (req,res) => {
        req.body.available= true //availeable to rent
        req.body.student= null // no student is currently renting it.
        req.body.user_id=database.collection("Users").doc(req.body.user_id) //belongs to user who posted it.
        for (let i=0;i<req.body.attractions.length;i++) {
            req.body.attractions[i]=database.collection("Attractions").doc(req.body.attractions[i])
        } //making each id to a reference.

        database.collection("Units").add(req.body).then(() => {
            res.send("The housing unit at: " + req.body.street + " "
            + req.body.house_number + " " + req.body.city + " posted successfully!")
        }).catch((error) => {
            res.send(error.message)
        })
    })

    app.post("/homepage_renter/delete",body_url, (req,res) => {
        database.collection("Units").doc(req.body.unitID).delete().then(function() {
            res.redirect("/homepage_renter") //can't redirect to the same page since then I will need more data.
            //and nobody deletes so many housing units in a row.
        }).catch(function(error) {
            res.render("message_page",{"message" : error}) //should work with the back button.
        })
    })
    //Edit unit actions:
    app.post("/homepage_renter/edit",body_url, (req,res) => {
        database.collection("Units").doc(req.body.unitID).get().then(unit =>
        {
            res.render("edit",{"unit": unit})
        }).catch((err) => {
            console.log(err)
            res.render("message_page",{"message": err})
        })
    })
    app.post("/homepage_renter/edit_housing_unit",body_json, (req,res) => {
        let unit= req.body.unitID
        delete req.body.unitID //don't want the id to be part of the database.
        database.collection("Units").doc(unit).update(req.body).then((success)=> {
            res.send("update complete!")
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
    })

    app.post("/homepage_renter/accept_order",body_url, (req,res) => {
        database.collection("Units").doc(req.body.unit_id).update({
            "available" : false, //no longer available
            "student" : database.collection("Users").doc(req.body.student_id) //create reference
        }).then ((success) => {
            //database.collection("Units").doc(req.body.order_id)
            database.collection("Orders").doc(req.body.order_id).update({
                "accepted": true
            }).then((success) =>{
                res.render("message_page",{"message": "accepted"})
            })
        }).catch((err) => {
            console.log(err)
            res.render("message_page",{"message": err})
        })
    })

    app.post("/homepage_renter/reject_order",body_url, (req,res) => {
        database.collection("Orders").doc(req.body.order_id).delete().then(function() {
            res.render("message_page",{"message": " order rejected!"}) //can't redirect to the same page since then I will need more data.
            //and nobody deletes so many housing units in a row.
        }).catch(function(error) {
            res.render("message_page",{"message" : error}) //should work with the back button.
        })

    })

    app.post("/homepage_renter/add_attraction",body_json, (req,res) => {
        database.collection("Attractions").add(req.body).then(function() {
            res.send("Attraction added successfully!") //can't redirect to the same page since then I will need more data.
            //and nobody deletes so many housing units in a row.
        }).catch(function(error) {
            res.send(error) //should work with the back button.
        })

    })
}
