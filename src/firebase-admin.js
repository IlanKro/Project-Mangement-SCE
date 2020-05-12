module.exports = function(){

  const admin= require ("firebase-admin")
  const serviceAccount = require("./serviceAccountKey.json")
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sec-room.firebaseio.com"
  })
  return admin
}


/*
src= for client
server= npm install

const firebase= require("https://www.gstatic.com/firebasejs/7.14.3/firebase.js")
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

      firebase.auth().currentUser.getIdToken(/* forceRefresh/ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
      });*/
