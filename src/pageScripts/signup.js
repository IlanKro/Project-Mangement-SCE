function userType(val) {
    // handles the radiobox elements on the top of the signup.
    let img_upload = document.getElementById("imgup")
    let bank = document.getElementById("bank_account")
    if (val == "renter") {
        img_upload.style.display = "none"
        bank.style.display = "block"
        //TODO: check how to implement those 4 lines for required input based on
        //radioboxes
        //document.getElementsbyId("student_image").required= false
        //document.getElementsbyId("bank").requred= true
    }
    if (val == "student") {
        img_upload.style.display = "block"
        bank.style.display = "none"
        //document.getElementsbyId("student_image").required =false
        //document.getElementsbyId("bank").required=false
    }
}

function passwordStrength(password) {
    // checks password strength and changes the site UI to match it's strength.
    // optional: make this a listener instead, or make it a pattern and remove this.
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

//sign up funtionallity:
const signupForm = document.querySelector("#SignupForm")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let form=document.getElementById("SignupForm").elements
    let signup_data= {}
    for(let i=0;i<form.length-1;i++){
        let element=form.item(i)
        signup_data[element.name]=element.value
    }
    // check password strength in case the new user presses the signup button.
    if(!passwordStrength(signup_data["pass"])) {
        alert("your password is too weak")
        return false
    }
    //student users:
    if (document.getElementById("student").checked){ //handling the radiobox element separately.
        signup_data["usertype"]="student"
        if (signup_data["img"]=="") {
            alert("no image uploaded!")
            return false
        }else{ //uploaded image
            uploadImage(signup_data["email"]).then((download_url) => {
                signup_data["img"] =download_url
                console.log("uploaded to:" + download_url )
                createUser(signup_data) //create student
            }).catch((error) =>{
                return false
            })
        }
    }
    else{ //create renter
        signup_data["usertype"]="renter"
        //TODO: make it so it's required instead of checking here.
        if (!signup_data["bank"]) {
            return false
        }
        createUser(signup_data) //create renter
    }
})

function createUser(signup_data) {
    auth.createUserWithEmailAndPassword(signup_data["email"],signup_data["pass"]).catch(error => {
        // Handle Errors here.
        alert("Error : " + error.message)
    }).then(cred => {
        signup_data["uid"]=cred.user.uid
        sendJSON("/signup",signup_data)
        redirectSignup(signup_data["usertype"])
    })
}

function redirectSignup(user_type) {
    try{
        if (user_type == "student") {
            alert("sign up was successful! wait for an admin to approve your account")
            auth.signOut()
        }
        else if (user_type == "renter") {
            //used to buy a little time for the browser to login as well.
            alert("user created succeffully!")
            window.location.href = "homepage_renter"
        }
        else
            alert("Unidentified usertype")
    }
    catch(e){
        window.location.href = "404.html"
    }
}

function sendJSON(url,data) {
    // send to url the json data
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(JSON.stringify(data))
}

var fileList= "none"
const fileSelector = document.getElementById("student_image")
fileSelector.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileList = event.target.files
})

async function uploadImage(email) {
    //uploads an image with the email name.
    //returns a promise with the download url.
    if(fileList[0].name == undefined)
        return null
    let ref= storage.ref("student_ids/" + email.toString() + fileList[0].name ) //making the upload unique since emails are unique
    uploadTask = ref.put(fileList[0]) //this is the download tank it needs to be activated to upload.
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            function(snapshot) { //progress part.
                const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
                console.log("Upload is " + progress + "% done")
            },
            function(error) { //error part
                reject(error)
                alert(error)
            },
            function() { //upload complete part.
                resolve(uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("File available at: ", downloadURL)
                    return downloadURL
                }))
            }
        )
    })
}
