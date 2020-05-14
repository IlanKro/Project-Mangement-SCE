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
    function getLibrary(library) {

        database.collection(library).get().then(doc => {
            let data= []
            let i=0
            doc.forEach(documentSnapshot => {
                console.log( documentSnapshot.data())
                data[i++] = documentSnapshot.data()
                console.log(data[i])
            })
            return data
        })

    }
    app.get("/homepage_admin",(req, res) => {
        let units= getLibrary("Units")
        console.log("done!" +units)

        res.render("homepage_admin")
    })
}
