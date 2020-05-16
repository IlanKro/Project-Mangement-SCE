const body_parser=require("body-parser")
const body_url=body_parser.urlencoded({extended: "true"})
const body_json=body_parser.json()
const pass_check=require("check-password-strength")

/*
function isLoggedIn (req, res, next)
{
    if (req.isAuthenticated()) {
        res.status(200).send("Welcome")
    } else {
        res.status(401).send("You are not allowed")
    }
}
*/


/*
function checkLoggedIn(request, resposense, next) {// if user is authenticated in the session, carry on
    if (request.isAuthenticated())
        return next()// if they aren't redirect them to the index page
    resposense.redirect("/")
}
*/

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
    app.get("/homepage_admin",(req, res) => {
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews")]).then(data =>
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
            res.render("homepage_admin",{"units" :units,"users" : users,"reviews" :reviews})
        })
    })
    /*
    app.post("/homepage_admin/enable",body_url, (req,res) => {
        console.log(req.body)
        console.log(req.body.uid)
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
    */

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


}
