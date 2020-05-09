firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
        document.getElementById("user_div").style.display = "block"
        document.getElementById("login_div").style.display = "none"
        let user2 = firebase.auth().currentUser
        if(user2 != null){
            let email_id = user2.email
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id
            alert("yay")
        }
    } 
    else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none"
        document.getElementById("login_div").style.display = "block"
        alert("hello you are not logged in")
    }
})

function login(){
    let userEmail = document.getElementById("email_field").value
    let userPass = document.getElementById("password_field").value
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.    
        window.alert("Error : " + error.message)   
    })
}

function logout(){
    firebase.auth().signOut()
}
