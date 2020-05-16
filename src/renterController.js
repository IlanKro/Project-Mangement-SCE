const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()

module.exports = function(app,admin) {
    const database= admin.firestore()
    async function getLibrary(library) {
        return database.collection(library).get().then(doc => {
            let data= []
            let i = 0
            for(dat of doc.docs)
                data[i++] = dat.data()
            return data
        })
    }
    app.get("/homepage_renter",(req, res) => {
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews"),getLibrary("Orders")]).then(data =>
        {
            let units=data[0]
            let users=data[1]
            let reviews=data[2]
            //todo show usernames according to references.
            /*
            console.log(users)
            for(var i = 0; i < users.length; i++) {
                console.log(users[i])
            }
            */
            res.render("homepage_renter",{"units" :units,"users" : users,"reviews" :reviews})
        })
    })

    app.post("/homepage_renter/post_housing_unit",body_url, (req,res) => {
        req.body.available= true
        req.body.student= null
        console.log(req.body)
        database.collection("Users").doc(req.body.user_id).get().then(ref => {
            req.body.user_id=ref.toString()
            console.log(ref)
            console.log(ref._path)
            console.log(ref.toString())
            database.collection("Units").add(req.body).then(() => {
                res.render("message_page",{"message" : req.body.city + " "
                + req.body.street + " " + req.body.house_number + " available for rent!"} )
            })
        }).catch((error) => {
            res.render("message_page",{"message" : error})
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
