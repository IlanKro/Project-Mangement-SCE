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
    let attractions=document.getElementsByClassName("attr_options")
    housing_data["attractions"] = []
    console.log(attractions)
    for(let i=0;i<attractions.length;i++ ) {
        if(attractions[i].selected) {
            housing_data["attractions"].push(attractions[i].value)
        }
    }
    console.log(housing_data["attractions"])
    if(fileList[0].name == undefined) {
        alert("Cannot upload a housing unit without at least one photo!")
        location.reload()
        return false
    }
    document.getElementById("postHouseButton").disabled= true //disables the button so they wait for the upload to finish.
    document.getElementById("postHouseButton").value = "Posting..."
    let image_uploads= []
    Array.prototype.forEach.call(fileList,(image,imgnum) => {
        image_uploads[imgnum]=uploadImage(imgnum,housing_data["city"]+housing_data["street"]+ housing_data["house_number"])
    })

    Promise.all(image_uploads).then((uploads)=> {
        housing_data["images"]=uploads //set images as the download link urls.
        sendJSON("/homepage_renter/post_housing_unit",
            housing_data,document.getElementById("postHouseButton"),"Post")
    })

})

function sendJSON(url,data,element,elementName) {
    // send to url the json data
    //element is the element to change to enabled state, the name is the name to change to..
    //Might need refatoring.
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.onload = function (e) {
        alert(request.responseText)
        element.value=elementName
        element.disabled= false
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


// Attractions code:
document.querySelector("#addAttraction").addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("addAttraction").elements
    let attr_data= {}
    for(let i=0;i<form.length-1;i++){
        let element=form.item(i)
        attr_data[element.name]=element.value
    }
    //check if name already exists.
    for(let i=0; i<attr_data["attr_num"]; i++) {
        if (attr_data["Attraction" + i] == attr_data["attraction_name"] ) {
            alert("Attraction name already exists!")
            return false
        }
        delete attr_data["Attraction" + i]
    }
    delete attr_data["attr_num"]

    document.getElementById("addAttractionButton").disabled= true //disables the button so they wait for the upload to finish.
    document.getElementById("addAttractionButton").value = "Adding..."
    let image_uploads= []
    if (fileListAttr[0].name != undefined) {
        Array.prototype.forEach.call(fileListAttr,(image,imgnum) => {
            image_uploads[imgnum]=uploadImage(imgnum,attr_data["attraction_name"])
        })
    }

    Promise.all(image_uploads).then((uploads)=> {
        attr_data["images"]=uploads //set images as the download link urls.
        sendJSON("/homepage_renter/add_attraction",attr_data,
            document.getElementById("addAttractionButton"),"Add")
    })

})


//might refactor later into one function:
var fileListAttr= "none"
const fileSelectorAttr = document.getElementById("attr_img")
fileSelectorAttr.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileListAttr = event.target.files
})


var tasks2=[]
async function uploadImage(imgnum,attr_name) {
    //uploads an image with the address name.
    //returns a promise with the download url.
    filename= "attraction_photos/" + attr_name.toString() + "/" + imgnum + fileListAttr[imgnum].name // the / creates a new folder.
    if(fileListAttr[imgnum].name == undefined)
        return null
    let ref= storage.ref(filename) //making the upload unique since emails are unique
    tasks2[imgnum]= ref.put(fileListAttr[imgnum]) //this is the download task it needs to be activated to upload.
    return new Promise((resolve, reject) => {
        tasks2[imgnum].on(
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
                resolve(tasks2[imgnum].snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("File available at: ", downloadURL)
                    return downloadURL
                }))
            }
        )
    })
}
