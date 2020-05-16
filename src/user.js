window.onload=function(){
    auth.onAuthStateChanged(function(user) {
        if (user
          && auth.currentUser )
            document.getElementById("welcome").innerHTML = "Logged in as : " + auth.currentUser.displayName
        else
            window.location= "/"
    })
}

/*
function checkIfLoggedIn(){
    auth.onAuthStateChanged(function(user) {
        if (user) { // if the user is logged in
            if(!auth.currentUser)  {
              a
            }

    })
}
*/
