/*
auth.createUserWithEmailAndPassword("hello13221@gmail.com","21321131ADSADa2").catch(error => {
// Handle Errors here.
    alert("Error : " + error.message)
}).then(cred => {
    console.log(cred)
})
*/

function userType(val) {
    let img_upload = document.getElementById("imgup")
    let bank = document.getElementById("bank_account")
    if (val == "renter") {
        img_upload.style.display = "none"
        bank.style.display = "block"
        //document.getElementsbyId("student_image").required= false
        //document.getElementsbyId("bank").requred= true
    }
    if (val == "student") {
        img_upload.style.display = "block"
        bank.style.display = "none"
        //document.getElementsbyId("student_image").required =false //change to true at the end
        //document.getElementsbyId("bank").required=false
    }
}

function passwordStrength(password) {
    let pass_check=document.getElementById("passwordCheck")
    if (password.length<8) {
        pass_check.innerHTML = "Password too short"
        pass_check.style.color="red"
        return false
    }
    let capital= /[A-Z]/g
    let lowercase= /[a-z]/g
    let numbers= /[0-9]/g
    let special=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    if(password.match(capital) && password.match(lowercase) && password.match(numbers) && password.match(special)) {
        pass_check.innerHTML = "Password is strong enough."
        pass_check.style.color="green"
        return true
    }
    pass_check.innerHTML = "Password is weak, must include at least :capital,lowercase,number,special."
    pass_check.style.color="red"
    return false
}

//function signUp() {
const signupForm = document.querySelector("#SignupForm")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let form=document.getElementById("SignupForm").elements
    let signup_data= {}
    for(let i=0;i<form.length-1;i++){
        let element=form.item(i)
        signup_data[element.name]=element.value
    }
    if (document.getElementById("student").checked){ //handling the radiobox element separately.
        signup_data["usertype"]="student"
        //TODO: add check for img upload but much later, only after the rest of the login works.
    }
    else {
        signup_data["usertype"]="renter"
        if (!signup_data["bank"]) {
            return false
        }
    }
    if(!passwordStrength(signup_data["pass"])) {
        alert("your password is too weak")
        return false
    }
    auth.createUserWithEmailAndPassword(signup_data["email"],signup_data["pass"]).catch(error => {
    // Handle Errors here.
        alert("Error : " + error.message)
    }).then(cred => {
        console.log(cred)
        console.log(cred.user.uid)
        createUser(cred.user.uid,signup_data)
        redirectSignup(signup_data["usertype"])
    })
})

function redirectSignup(user_type) {
    try{
        if (user_type == "student") {
            alert("sign up was successful! wait for an admin to approve your account")
            auth.signOut()
        }
        else if (user_type == "renter")
            window.location.href = "homepage_renter"
        else
            alert("Unidentified usertype")
    }
    catch(e){
        window.location.href = "404.html"
    }
}


function createUser(uid,signup_data) {
    signup_data["uid"]=uid
    sendJSON("/signup",signup_data)
}

//testing:
function sendJSON(url,data) {
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(JSON.stringify(data))
}
