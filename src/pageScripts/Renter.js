
const bookForm = document.querySelector("#addHousingForm")
bookForm.addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("addHousingForm").elements
    let housing_data= {}
    for(let i=0;i<form.length-1;i++){
        let element=form.item(i)
        housing_data[element.name]=element.value
    }

})

var fileList= "none"
const fileSelector = document.getElementById("student_image")
fileSelector.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileList = event.target.files
})

async function uploadImage(adress) {
    //uploads an image with the email name.
    //returns a promise with the download url.
    if(fileList[0].name == undefined)
        return null
    let ref= storage.ref("housing_units_photos/" + adress.toString() + fileList[0].name ) //making the upload unique since emails are unique
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
