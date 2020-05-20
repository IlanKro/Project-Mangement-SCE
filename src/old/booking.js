const unit = JSON.parse(localStorage.getItem("unit"))
const labelPrice = document.getElementById("price")
const labelDescription = document.getElementById("description")
const labelRoomsNum = document.getElementById("number_of_rooms")
const labelAddress= document.getElementById("address")
const labelMaxRentTime = document.getElementById("max_rent_time")
const labelMinRentTime = document.getElementById("min_rent_time")
const labelPhone = document.getElementById("phone")
const labelOwner = document.getElementById("owner")
const labelEmail = document.getElementById("email")
const bookingForm = document.querySelector("#bookingForm")
const credit_card = document.getElementById("credit_card")
var user
auth.onAuthStateChanged(function(userObj) {
    if(userObj) {
        user = userObj
        init()
        initForm()
    }
})

function init() {
    console.log(unit)
    labelPrice.innerHTML = "Price: " + unit.price
    labelDescription.innerHTML = "Description: " + unit.description
    labelRoomsNum.innerHTML = "Rooms Number: " + unit.numRooms
    labelAddress.innerHTML = "Address: " + unit.address
    labelMaxRentTime.innerHTML = "Max Renting Time: " + unit.max_rent_time
    labelMinRentTime.innerHTML = "Min Renting Time: " + unit.min_rent_time
    labelPhone.innerHTML = "Phone: " + unit.phone
    labelOwner.innerHTML = "Owner: " + unit.user.fname + " " + unit.user.lname
    labelEmail.innerHTML = "Email: " + unit.user.email
}

function initForm() {
    bookingForm.addEventListener("submit", (e) => {
        const card_number = credit_card.value
        console.log(card_number)
        if (!validateCardNumber(card_number)){
            alert("invalid card number")
            return
        }
        e.preventDefault()
        let orderData= {}
        orderData["price"] = unit.price
        orderData["unit"] = db.collection("Units").doc(unit.unitId)
        orderData["student"] = db.collection("Users").doc(user.uid)
        const time = firebase.firestore.Timestamp.fromDate(new Date())
        orderData["timestamp"] = time
        db.collection("Orders").add(orderData).then(doc => {
            let unitData = {}
            unitData["available"] = false
            unitData["student"] = db.collection("Users").doc(user.uid)
            //update unit to be not available and update reference to student
            db.collection("Units").doc(unit.unitId).update(unitData).then(doc => {
                alert("Order Completed Successfully")
                setTimeout(function(){ window.location.href = "homepage_student" }, 1500)
            })
        })
    })
}

function validateCardNumber(number) {
    return valid_credit_card(number)
}


function valid_credit_card(value) {
  	if (/[^0-9-\s]+/.test(value)) return false
  	// The Luhn Algorithm. It's so pretty.
  	let nCheck = 0, bEven = false
  	value = value.replace(/\D/g, "")
  	for (var n = value.length - 1; n >= 0; n--) {
  		var cDigit = value.charAt(n),
  			  nDigit = parseInt(cDigit, 10)
  		if (bEven && (nDigit *= 2) > 9) nDigit -= 9
  		nCheck += nDigit
  		bEven = !bEven
  	}
  	return (nCheck % 10) == 0
}