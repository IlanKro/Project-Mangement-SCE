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
            let data= {}
            let i = 0
            for(dat of doc.docs)
                data[i++] = dat.data()
            //console.log(data)
            return data
        })
    }
    app.get("/homepage_admin",(req, res) => {
        Promise.all([getLibrary("Units"),getLibrary("Users"),getLibrary("Reviews")]).then(data =>
        {
            let units=data[0]
            let users=data[1]
            let reviews=data[2]
            res.render("homepage_admin",{"units" :units,"users" : users,"reviews" :reviews})
        })
    })
}
