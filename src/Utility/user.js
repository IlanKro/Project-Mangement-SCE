window.onload=function(){
    auth.onAuthStateChanged(function(user) {
        if (user && auth.currentUser ) {
            //if there is a welcome id it changes the text to logged user.
            if (document.getElementById("welcome")) {
                document.getElementById("welcome").innerHTML = "Logged in as : " + auth.currentUser.displayName
            }
        }
        else
            window.location= "/" //if no user is logged on kicks you out to index.
    })
}
