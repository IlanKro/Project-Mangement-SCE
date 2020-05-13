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


var auth=firebase.auth()
var db=firebase.firestore()

/*
function signInUsers(){
    console.log("LIU")
    alert("LIU")
    let email = document.getElementById("email_field").value
    let pass = document.getElementById("password_field").value
    console.log(email + " " + pass)
    auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        alert("error")
        console.log(error.code + ":" + error.message)
        alert(error.message)
    }).then()
    alert("post login2")
}

//check if user is logged in or not
function checkIfLoggedIn(){
    auth.onAuthStateChanged(function(user) {
        alert("checkif")
        if (user) { // if the user is logged in
            console.log(user)
            let email =user.email
            console.log("User is signed in. with email: "+ email)
            alert("YAY")
            document.getElementById("login_div").setAttribute("style","display: none;visibility: hidden;")
            document.getElementById("user_div").setAttribute("style","display: inline-block;visibility: visible;")
        } else { // if the user is not logged in
            console.log("No user is signed in.")
            document.getElementById("login_div").setAttribute("style","display: block;visibility: visible;")
            document.getElementById("user_div").setAttribute("style","display: inline-block;visibility: hidden;")
        }
    })
}

window.onload=function(){
    alert("onload")
    checkIfLoggedIn()

}
function logout(){
    auth.signOut()
    checkIfLoggedIn()
}
/*firebase.auth().currentUser.getIdToken(/* forceRefresh/ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
      }) */

/*src= for client
      server= npm install
*/
