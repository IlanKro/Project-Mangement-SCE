function formJSONify(form) {
    json= {}
    for(let i=0;i<form.length-1;i++){
        json[form.item(i).name]=form.item(i).value
    }
    return json
}
