var modals= document.getElementsByClassName("modal")
// Get the button that opens the modal
const button= document.getElementsByClassName("modalButton")
// Get the <span> element that closes the modal
const span= document.getElementsByClassName("close")
// When the user clicks on the button, open the modal

for(let i=0; i<modals.length;i++) {
    button[i].onclick = function() {
        modals[i].style.display = "block"
    }
    span[i].onclick = function() {
        modals[i].style.display = "none"
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    for(let i=0;i<modals.length;i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none"
        }
    }
}
