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

    li.setAttribute("data-id", doc.id)
    price.textContent = "Price: " + doc.data().price
    desc.textContent = "Description: " + doc.data().description
    numRooms.textContent = "Num Of Rooms: " + doc.data().rooms_num
    address.textContent = "Addess: " + doc.data().city + doc.data().street + doc.data().house_number
    max_rent_time.textContent = "Max staying time: " + doc.data().max_rent_time
    min_rent_time.textContent = "Min staying time: " + doc.data().min_rent_time
    phone.textContent = "Phone: " + doc.data().phone
    doc.data().user_id.get().then(res => {
      console.log(res)
      if(res.exists) {
        owner.textContent = res.data().fname + " " + res.data().lname
        email.textContent = "Email: " + res.data().email
      }
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
    unitList.appendChild(li)
}

// getting data
db.collection("Units").get().then(snapshot => {
    console.log(auth.currentUser)
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        renderUnit(doc)
    })
})
