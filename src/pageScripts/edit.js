var images_to_delete= []
document.querySelector("#editHousingForm").addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("editHousingForm").elements
    let housing_data= formJSONify(form)  
    let images= [] //this array is the images which will be saved to database.
    for (let i=0; i<housing_data["images_num"];i++) {
        if(!images_to_delete[i])
            images.push(housing_data["image" + i])
        delete housing_data["image" + i] //remove it from the hidden parameter.
    }
    delete housing_data["images_num"] // deleting this as it's no longer needed.
    if (images.length== 0 && housing_data["images"]=="") { //if no photo is left..
        alert("You cannot have a housing unit without photos")
        return false
    }
    document.getElementById("editHouseButton").disabled= true //disables the button so they wait for the upload to finish.
    document.getElementById("editHouseButton").value = "Updating..."
    let image_uploads= []
    Array.prototype.forEach.call(fileList,(image,imgnum) => {
        image_uploads[imgnum]=uploadImage(imgnum,housing_data["city"]+housing_data["street"]+ housing_data["house_number"])
    })

    Promise.all(image_uploads).then((uploads)=> {
        //join the old pictures with the new ones.
        housing_data["images"]=images.concat(uploads) //set images as the download link urls.
        sendJSON("/homepage_renter/edit_housing_unit",housing_data)
    })


})

document.querySelector("#deleteImage").addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("deleteImage").elements
    for(let i=0;i<form.length-1;i++){
        let to_delete= form.item(i).checked //go through the checkboxes
        images_to_delete[i]=to_delete
        //select those that are to be deleted.
    }
})


function sendJSON(url,data) {
    // send to url the json data
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.onload = function (e) {
        alert(request.responseText)
        document.getElementById("editHouseButton").value = "Edit"
        document.getElementById("editHouseButton").disabled= false //enables the button again.
    }
    request.send(JSON.stringify(data))
}

var fileList= "none"
const fileSelector = document.getElementById("house_img")
fileSelector.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileList = event.target.files
})

var tasks=[]
async function uploadImage(imgnum,address) {
    //uploads an image with the address name.
    //returns a promise with the download url.
    filename= "housing_units_photos/" + address.toString() + "/" + imgnum + fileList[imgnum].name // the / creates a new folder.
    if(fileList[imgnum].name == undefined)
        return null
    let ref= storage.ref(filename) //making the upload unique since emails are unique
    tasks[imgnum]= ref.put(fileList[imgnum]) //this is the download task it needs to be activated to upload.
    console.log(tasks[imgnum])
    return new Promise((resolve, reject) => {
        tasks[imgnum].on(
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
                resolve(tasks[imgnum].snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("File available at: ", downloadURL)
                    return downloadURL
                }))
            }
        )
    })
}
