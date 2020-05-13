function userType(val) {
    let img_upload = document.getElementById("imgup")
    let bank = document.getElementById("bank_account")
    if (val == "renter") {
        img_upload.style.display = "none"
        bank.style.display = "block"
        document.getElementsbyId("student_image").required= false
        document.getElementsbyId("bank").requred= true
    }
    if (val == "student") {
        img_upload.style.display = "block"
        bank.style.display = "none"
        document.getElementsbyId("student_image").required =false //change to true at the end
        document.getElementsbyId("bank").required=false
    }
}

function passwordStrength(password) {
    console.log("checking password")
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

function signUp() {
    let form=document.getElementById("SignupForm").elements
    let signup_data= []
    for(let i=0;i<form.length;i++){
        let element=form.item(i)
        signup_data[element.name]=element.value
        console.log(i + " " + signup_data[element.name])
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

    alert(signup_data["email"] + signup_data["pass"])

    if(!passwordStrength(signup_data["pass"])) {
        alert("your password sucks")
        return false
    }
    auth.createUserWithEmailAndPassword(signup_data["email"], signup_data["pass"]).catch(error => {
    // Handle Errors here.
        alert("Error : " + error.message)
    }).then(cred => {
        console.log(cred)
    })
}



/*

*/
