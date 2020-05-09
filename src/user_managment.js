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
}



        
function forgotPassword() {
}

function signUp() {       
    let username = document.getElementById("ue").value
    let password = document.getElementById("pass").value
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
        window.alert("Error : " + error.message)                      
    })
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
    
