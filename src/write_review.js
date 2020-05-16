const reviewForm = document.querySelector("#review_form")
//the user object is not initialized at first, it takes time to load it so we use onAuthStateChanged
//that will get called only when the object is ready
auth.onAuthStateChanged(function(user) {
    if(user) {
        getUnit(user)
    }
})

//here we get the unit of the student from the database
function getUnit(user) {
    console.log(user)
    //search the unit of the student by reference of the student id
    const studentRef = db.collection("Users").doc(user.uid)
    console.log(studentRef)
    //use where to query database
    db.collection("Units").where("student", "==", studentRef).get().then(snapshot=> {
        if (snapshot.empty) {
            console.log("No matching documents.")
            return
        }
        snapshot.forEach(doc => {
            console.log(doc.data())
            renderUnit(doc.data())
            const renterId = doc.data().user_id.id
            getRenter(renterId)
            addClick(doc.id, renterId, user.uid)
        })
    }).catch(err => {
        console.log("Error getting documents", err)
    })
}

function addClick(unitId, renterId, userId) {
    const time = firebase.firestore.Timestamp.fromDate(new Date())
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let form = document.getElementById("review_form").elements
        let review_data= {}
        for(let i = 0; i < form.length - 1; i++){
            let element=form.item(i)
            review_data[element.name]=element.value
        }
        review_data["timestamp"] = time
        //to save reference write int this format: "/<table_name>/<doc_id>"
        review_data["renter_id"] = db.collection("Users").doc(renterId)
        review_data["student_id"] = db.collection("Users").doc(userId)
        review_data["unit_id"] = db.collection("Users").doc(unitId)
        console.log(review_data)
        db.collection("Reviews").add(review_data).then(res => {
            window.location.href = "homepage_student"
        })
    })
}

function renderUnit(unit) {
    const unitAddress = document.getElementById("unit_address")
    unitAddress.innerHTML = unit.house_number + " " + unit.street + ", " + unit.city
}

function getRenter(renterId) {
    console.log(renterId)
    db.collection("Users").doc(renterId).get().then(doc => {
        if(doc.exists) {
            console.log(doc.data())
            renderRenter(doc.data())
        }
        else {
            console.log("renters not found")
        }
    })
}

function renderRenter(renter) {
    const renterName = document.getElementById("renter_name")
    renterName.innerHTML = renter.fname + " " + renter.lname
}
