const GGScript = require("ggscript")
console.log(GGScript())
/*
gg_script("https://www.gstatic.com/fireba)js/7.14.3/firebase-app.js").then(() => {
    console.log("Finished loading file.")
}).catch((err) => {
    console.error("Something bad just happened! " + err)
})
*/
/*
//const firebase_auth= require("https://www.gstatic.com/firebasejs/7.14.3/firebase-auth.js")
//const firebase_firestore= require("https://www.gstatic.com/firebasejs/7.14.3/firebase-firestore.js")

var firebaseConfig = {
      apiKey: "AIzaSyCuqm7lR0YYnF8IiarnGQMEfRM-Fs5QpP4",
      authDomain: "sce-room.firebaseapp.com",
      databaseURL: "https://sce-room.firebaseio.com",
      projectId: "sce-room",
      storageBucket: "sce-room.appspot.com",
      messagingSenderId: "289292987021",
      appId: "1:289292987021:web:eb1bcaeef9af28611f50c4",
      measurementId: "G-MT3MN5L1S3"
  }
  // Initialize Firebase
  if (firebase.apps.length == 0)
      firebase.initializeApp(firebaseConfig)

/*firebase.auth().currentUser.getIdToken(/* forceRefresh/ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
      }) */

      /*src= for client
      server= npm install
*/
