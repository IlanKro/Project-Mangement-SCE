window.onload=function(){
    document.getElementById("addHousingForm").reset
}
document.querySelector("#addHousingForm").addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("addHousingForm").elements
    let housing_data= {}
    for(let i=0;i<form.length-1;i++){
        let element=form.item(i)
        housing_data[element.name]=element.value
    }
    if(fileList[0].name == undefined) {
        alert("Cannot upload a housing unit without at least one photo!")
        location.reload()
        return false
    }
    document.getElementById("postHouseButton").disabled= true //disables the button so they wait for the uplaod to finish.
    document.getElementById("postHouseButton").value = "Posting..."
    let image_uploads= []
    Array.prototype.forEach.call(fileList,(image,imgnum) => {
        image_uploads[imgnum]=uploadImage(imgnum,housing_data["city"]+housing_data["street"]+ housing_data["house_number"])
    })

    Promise.all(image_uploads).then((uploads)=> {
        housing_data["images"]=uploads //set images as the download link urls.
        sendJSON("/homepage_renter/post_housing_unit",housing_data)
    })

})

function sendJSON(url,data) {
    // send to url the json data
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.onload = function (e) {
        alert(request.responseText)
        document.getElementById("postHouseButton").value = "Post"
        document.getElementById("postHouseButton").disabled= false //enables the button again.
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
