const logout = document.getElementsByClassName("logoutButton")[0]
logout.addEventListener("click", (ev) => {
    ev.preventDefault()
    alert("signing out")
    auth.signOut().then(() => {
        window.location="/"
    })
})
