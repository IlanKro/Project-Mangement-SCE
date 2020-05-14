// logout
const logout = document.querySelector("#logout")
logout.addEventListener("click", (ev) => {
    ev.preventDefault()
    alert("signing out")
    auth.signOut().then(() => {
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
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        loginForm.reset()
    }).catch((error) => {
        alert(error.message)
    })
})

window.onload=function(){
    checkIfLoggedIn()
}

function checkIfLoggedIn(){
    auth.onAuthStateChanged(function(user) {
        if (user) { // if the user is logged in
            let email =user.email
            document.getElementById("login_div").setAttribute("style","display: none;visibility: hidden;")
            document.getElementById("user_div").setAttribute("style","display: inline-block;visibility: visible;")
            if(auth.currentUser)  {
                document.getElementById("user_para").innerHTML = "Logged in as: " + auth.currentUser.displayName
            }
        } else { // if the user is not logged in
            document.getElementById("login_div").setAttribute("style","display: block;visibility: visible;")
            document.getElementById("user_div").setAttribute("style","display: inline-block;visibility: hidden;")
        }
    })
}

function sendJSONRedirect(url,data,method) {
    // send to url the json data and redirect to url received.
    let request = new XMLHttpRequest()
    request.open(method, url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.onload = function (e) {
        window.location=request.responseURL
    }
    request.send(JSON.stringify(data))
    return request
}
//redirect upon pressing "enter site"
const enter_site = document.getElementById("enterSite")
enter_site.addEventListener("click", (ev) => {
    sendJSONRedirect("/login",{uid: auth.currentUser.uid },"post")
})
