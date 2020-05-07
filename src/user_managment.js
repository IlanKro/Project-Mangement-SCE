function login() {
    var username = document.getElementById("ue").value
    var password = document.getElementById("pass").value   
    // add link to database.       
    try{window.location="homepage_student.html"}
    catch(e) {window.location="404.html"}    
}


function signUp() {
    
}

function userType(val) { 
    var img_upload = document.getElementById("imgup")
    var bank = document.getElementById("bank_account")
    if (val == "renter") {                       
        img_upload.style.display = "none"         
        bank.style.display = "block"
        //img_upload.setAttribute("required","false")
        //bank.input.setAttribute("required","true")
    }
    if (val == "student") {           
        img_upload.style.display="block"           
        bank.style.display = "none"
        //img_upload.input.setAttribute("required","true")
        //bank.input.setAttribute("required","false")            
    }
}


