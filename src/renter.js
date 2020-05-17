auth.onAuthStateChanged(function(user) {
    if (user && auth.currentUser )
        document.getElementById("SendRId").value=auth.currentUser.uid
})

let unitCardsContainer = document.querySelector(".unitCardsContainer")

for (let i = 1; i <= 3; i++) {
    let unitCard = document.createElement("div")
    unitCard.innerHTML = "<div class=\"card\">"
    unitCard.innerHTML += "<img src=\"/src/images/SCE%ROOM.png\" alt=\"No Image\" style=\"width:100%\">"
    unitCard.innerHTML += "<h3>Address</h3>"
    unitCard.innerHTML += "<p class=\"price\">2000 ILS / Month</p>"
    unitCard.innerHTML += "<p>Description</p>"
    unitCard.innerHTML += "<p><button>Remove Unit</button></p>"
    unitCard.innerHTML += "<br/><br/><br/><br/><br/></div>"
    unitCardsContainer.appendChild(unitCard)
}