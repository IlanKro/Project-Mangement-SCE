const unitList = document.querySelector('#unit-list')

// create element & render cafe
function renderUnit(doc){
    let li = document.createElement('li')
    let price = document.createElement('span')
    let desc = document.createElement('span')
    let numRooms = document.createElement('span')
    let address = document.createElement('span')
    let owner = document.createElement('span')
    let timeLimit = document.createElement('span')

    li.setAttribute('data-id', doc.id);
    price.textContent = "Price: " + doc.data().price
    desc.textContent = "Description: " + doc.data().description
    numRooms.textContent = "Num Of Rooms: " + doc.data().rooms_num
    address.textContent = "Addess: " + doc.data().city + doc.data().street + doc.data().house_number
    timeLimit.textContent = "Staying Time: " + doc.data().time_limit
    doc.data().user_id.get().then(res =>{
      owner.textContent = res.data().fname + " " + res.data().lname
    })


    li.appendChild(price)
    li.appendChild(desc)
    li.appendChild(numRooms)
    li.appendChild(address)
    li.appendChild(timeLimit)
    li.appendChild(owner)
    unitList.appendChild(li);
}

// getting data
db.collection('Units').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        renderUnit(doc);
    });
});
