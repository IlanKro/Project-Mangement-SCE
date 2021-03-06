/*import for the admin server side firebase module*/
module.exports = function(){

    const admin= require ("firebase-admin")
    const serviceAccount = require("./serviceAccountKey.json")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://sce-room.firebaseio.com"
    })
    return admin
}
