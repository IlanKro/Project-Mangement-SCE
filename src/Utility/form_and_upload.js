function formJSONify(form) {
    json= {}
    for(let i=0;i<form.length-1;i++){
        json[form.item(i).name]=form.item(i).value
    }
    return json
}

var tasks=[]
async function uploadImage(directory,files,imgnum,identifier) {
    //uploads an image with the identifier.
    //directory: the directory in cloud
    //files- files to uploads
    //imagenum- the number of image to upload, from the file s array.
    //identifier - the identifier to make the upload unique.
    //returns a promise with the download url.
    filename= directory + identifier.toString() + "/" + imgnum + files[imgnum].name // the / creates a new folder.
    if(files[imgnum].name == undefined)
        return null
    let ref= storage.ref(filename) //making the upload unique since emails are unique
    tasks[imgnum]= ref.put(files[imgnum]) //this is the download task it needs to be activated to upload.
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
