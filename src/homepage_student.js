
const unitList = document.querySelector("#unit-list")

// create element & render cafe
function renderUnit(doc){
    let li = document.createElement("li")
    let price = document.createElement("span")
    let desc = document.createElement("span")
    let numRooms = document.createElement("span")
    let address = document.createElement("span")
    let owner = document.createElement("span")
    let max_rent_time = document.createElement("span")
    let min_rent_time = document.createElement("span")
    let phone = document.createElement("span")
    let email = document.createElement("span")

    li.setAttribute("data-id", doc.unitId)
    price.textContent = "Price: " + doc.price
    desc.textContent = "Description: " + doc.description
    numRooms.textContent = "Num Of Rooms: " + doc.numRooms
    address.textContent = "Addess: " + doc.address
    max_rent_time.textContent = "Max staying time: " + doc.max_rent_time
    min_rent_time.textContent = "Min staying time: " + doc.min_rent_time
    phone.textContent = "Phone: " + doc.phone
    owner.textContent = doc.user.fname + " " + doc.user.lname
    email.textContent = "Email: " + doc.user.email
    const btn = document.createElement("button")
    btn.appendChild(document.createTextNode("Checkout"))
    btn.addEventListener("click", function() {
        console.log(doc)
        localStorage.setItem("unit", JSON.stringify(doc))
        window.location.href = "booking"
    })

    li.appendChild(price)
    li.appendChild(desc)
    li.appendChild(numRooms)
    li.appendChild(address)
    li.appendChild(max_rent_time)
    li.appendChild(min_rent_time)
    li.appendChild(phone)
    li.appendChild(owner)
    li.appendChild(email)
    li.appendChild(btn)
    unitList.appendChild(li)
}

// getting data
db.collection("Units").where("available", "==", true).get().then(snapshot => {
    console.log(auth.currentUser)
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        doc.data().user_id.get().then(userDoc => {
            console.log(userDoc)
            if(userDoc.exists) {
                let unit = new Unit(doc.data(), userDoc.data(), doc.id, userDoc.id)
                console.log(unit)
                renderUnit(unit)
            }
        })
    })
})
