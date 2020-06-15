window.onload=function(){
    document.getElementById("addHousingForm").reset
}
var fileList= "none"
const fileSelector = document.getElementById("house_img")
fileSelector.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileList = event.target.files
})
document.querySelector("#addHousingForm").addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("addHousingForm").elements
    let housing_data= formJSONify(form)
    //attraction handlling part.
    let attractions=document.getElementsByClassName("attr_options")
    housing_data["attractions"] = []
    if(attractions.length==0) {
        alert("You must select at least one attraction")
        location.reload()
        return false
    }
    for(let i=0;i<attractions.length;i++ ) {
        if(attractions[i].selected) {
            housing_data["attractions"].push(attractions[i].value)
        }
    }

    if(fileList[0].name == undefined) {
        alert("Cannot upload a housing unit without at least one photo!")
        location.reload()
        return false
    }
    document.getElementById("postHouseButton").disabled= true //disables the button so they wait for the upload to finish.
    document.getElementById("postHouseButton").value = "Posting..."
    let image_uploads= []
    Array.prototype.forEach.call(fileList,(image,imgnum) => {
        image_uploads[imgnum]=uploadImage("housing_units_photos/",fileList,imgnum,housing_data["city"]+housing_data["street"]+ housing_data["house_number"])
    })

    Promise.all(image_uploads).then((uploads)=> {
        console.log(uploads)
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


var fileListAttr= "none"
const fileSelectorAttr = document.getElementById("attr_img")
fileSelectorAttr.addEventListener("change", (event) => {
    //add listener to the image upload selector.
    fileListAttr = event.target.files
})
// Attractions code:
document.querySelector("#addAttraction").addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("addAttraction").elements
    let attr_data= formJSONify(form)
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
            image_uploads[imgnum]=uploadImage2("attraction_photos/",fileListAttr,imgnum,attr_data["attraction_name"])
        })
    }

    Promise.all(image_uploads).then((uploads)=> {
        attr_data["images"]=uploads //set images as the download link urls.
        sendJSON("/homepage_renter/add_attraction",attr_data,
            document.getElementById("addAttractionButton"),"Add")
    })

})
