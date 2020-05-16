window.onload=function(){
    auth.onAuthStateChanged(function(user) {
        if (user
          && auth.currentUser )
            document.getElementById("welcome").innerHTML = "Logged in as : " + auth.currentUser.displayName
        else
            window.location= "/"
    })
}
