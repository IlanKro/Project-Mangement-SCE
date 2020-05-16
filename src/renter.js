auth.onAuthStateChanged(function(user) {
    if (user && auth.currentUser )
        document.getElementById("SendRId").value=auth.currentUser.uid
})
