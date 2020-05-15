// Get the modal
const modal = document.getElementById("student modal")
const modal2 = document.getElementById("ban modal")
const modal3 = document.getElementById("deleteReviewsModal")
var modals= [modal,modal2,modal3]
// Get the button that opens the modal
const button= document.getElementsByClassName("button")
// Get the <span> element that closes the modal
const span= document.getElementsByClassName("close")
// When the user clicks on the button, open the modal

for(let i=0; i<button.length;i++) {
    button[i].onclick = function() {
        modals[i].style.display = "block"
    }
    span[i].onclick = function() {
        modals[i].style.display = "none"
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    for(let i=0;i<modals.length;i++)
        if (event.target == modals[i])
            modals[i].style.display = "none"
}
