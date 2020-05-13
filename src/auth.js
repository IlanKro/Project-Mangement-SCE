


// logout
const logout = document.querySelector("#logout")
logout.addEventListener("click", (ev) => {
    ev.preventDefault()
    auth.signOut().then(() => {
        console.log("user signed out")
        window.location="/"
    })
})
// login
const loginForm = document.querySelector("#login_form")
loginForm.addEventListener("submit", (ev) => {
    ev.preventDefault()
    // get user info
    const email = loginForm["email_field"].value
    const password = loginForm["password_field"].value
    console.log(email + password)
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        loginForm.reset()
    }).catch((error) => {
        alert("error login")
    })
})

window.onload=function(){
    checkIfLoggedIn()
}

function checkIfLoggedIn(){
    auth.onAuthStateChanged(function(user) {
        if (user) { // if the user is logged in
            console.log(user)
            let email =user.email
            console.log("User is signed in. with email: "+ email)
            document.getElementById("login_div").setAttribute("style","display: none;visibility: hidden;")
            document.getElementById("user_div").setAttribute("style","display: inline-block;visibility: visible;")
        } else { // if the user is not logged in
            console.log("No user is signed in.")
            document.getElementById("login_div").setAttribute("style","display: block;visibility: visible;")
            document.getElementById("user_div").setAttribute("style","display: inline-block;visibility: hidden;")
        }
    })
}
