firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
        document.getElementById("user_div").style.display = "block"
        document.getElementById("login_div").style.display = "none"       
        if(firebase.auth().currentUser)  {                 
            document.getElementById("user_para").innerHTML = "Welcome User : " + firebase.auth().currentUser.email                
            redirectLogin("student")
        }
    } 
    else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none"
        document.getElementById("login_div").style.display = "block"        
    }
})

function login(){
    let userEmail = document.getElementById("email_field").value
    let userPass = document.getElementById("password_field").value
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.    
        window.alert("Error : " + error.message)   
    })        
}


function redirectLogin(user_type) {
    try{
        if (user_type == "student")         
            window.location.href = "homepage_student.html"         
        else if (user_type == "renter")
            window.location.href = "homepage_renter.html"
        else if (user_type == "admin")
            window.location.href = "homepage_admin.html"                     
        else 
            alert("Unidentified usertype")          
    }
    catch(e){
        window.location.href = "404.html"
    }
        
}

function logout(){
    firebase.auth().signOut()
    window.location.href = "index.html"   
}



        
function forgotPassword() {
}

function signUp() {     
    let form=document.getElementById("SignupForm").elements
    let signup_data= []
    alert("entering loop")
    alert(form.length)
    alert(form.item(0).value)
    for(let i=0;i<form.length;i++){        
        let element=form.item(i)        
        signup_data[element.name]=element.value        
        alert(i + " "+ element.name + " " + element.value)
    }     
    if (document.getElementById("student").checked) //handling the radiobox element separately.
        signup_data["usertype"]="student"
    else
        signup_data["usertype"]="renter" 
    alert(signup_data["email"] + signup_data["pass"])
    if(!passwordStrength(signup_data["pass"]))
        throw "Password too weak!"
    
    firebase.auth().createUserWithEmailAndPassword(signup_data["email"], signup_data["pass"]).catch(function(error) {
    // Handle Errors here.
        window.alert("Error : " + error.message)         
    })
    
    alert("!")
         
}

function userType(val) {        
    let img_upload = document.getElementById("imgup")
    let bank = document.getElementById("bank_account")
    if (val == "renter") {            
        img_upload.style.display = "none"         
        bank.style.display = "block"        
    }
    if (val == "student") {           
        img_upload.style.display = "block"           
        bank.style.display = "none"                 
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
    
