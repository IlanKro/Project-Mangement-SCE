console.log("hello from firebase")
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
function signInUsers(){
    let email = document.getElementById('email_field').value
    let pass = document.getElementById('password_field').value
    console.log(email + " " + pass)
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
                   // Handle Errors here.
                  let errorCode = error.code
                  let errorMessage = error.MESSAGE
                  console.log(errorCode)
                  console.log(errorMessage)
    })
}
       //check if user is logged in or not
function checkIfLoggedIn(){
  firebase.auth().onAuthStateChanged(function(user) {
           if (user) { // if the user is logged in
              console.log(user)
              let emailv =user.email
              console.log("User is signed in. with email: "+ emailv)
              document.getElementById('loginButton').setAttribute('style','display: none;visibility: hidden;');
              document.getElementById('logoutButton').setAttribute('style','display: inline-block;visibility: visible;')
          } else { // if the user is not logged in
                 console.log("No user is signed in.");
                 document.getElementById('loginButton').setAttribute("style","display: block;visibility: visible;");
                 document.getElementById('logoutButton').setAttribute("style","display: inline-block;visibility: hidden;")
             }
         })
}

window.onload=function(){
      checkIfLoggedIn()
     }
function logout(){
    firebase.auth().signOut();
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
