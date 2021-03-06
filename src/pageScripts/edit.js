var images_to_delete= []

var fileList= "none"
const fileSelector = document.getElementById("house_img")
fileSelector.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileList = event.target.files
})
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
    let address=housing_data["city"]+housing_data["street"]+ housing_data["house_number"]
    let image_uploads= uploads("housing_units_photos/",fileList,address)

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
