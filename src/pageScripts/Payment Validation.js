const bookForm = document.querySelector("#bookingForm")
bookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    e.returnValue= true
    let form=document.getElementById("bookingForm").elements
    let order_data= {}
    for(let i=0;i<form.length-1;i++){
        let element=form.item(i)
        order_data[element.name]=element.value
    }

    if (!valid_credit_card(order_data["CreditCardNumber"])) {
    //if credit card is incorrect or the price is incorrect
        alert("credit card is invalid!")
        return false
    }
    //assume a transaction happened and we got the id:
    order_data["transaction_id"]=transaction(order_data)
    alert("transaction was successful!!")
    //TODO handle trasaction errors too.
    //delete the credit card data
    let deleteList=["ID","CVC","expiry","CreditCardNumber","expireMM","expireYY"]
    for(let i=0;i<deleteList.length;i++)
        delete order_data[deleteList[i]]
    //send request to server.
    sendJSON("/booking",order_data)

})

function sendJSON(url,data) {
    // send to url the json data
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(JSON.stringify(data))
}

function transaction(order_data) {
    //no time to implement payment have a random string as placeholder.
    return (Math.floor(Math.random() * (10000000000000000000 - 10000000) ) + 10000000).toString(36).substring(2,30)
}

//TODO: doesn't currently work!! (orders don't calculate the price right)
var min_month= document.getElementById("min_month")
var max_month=document.getElementById("max_month")
var min_year=document.getElementById("min_year")
var max_year=document.getElementById("max_year")
var range= [min_month,max_month, min_year,max_year]
range.forEach(item => {
    item.addEventListener("onchange", (e) => {
        alert("total price")

        let min_month= document.getElementById("min_month").value
        let max_month=document.getElementById("max_month").value
        let min_year=document.getElementById("min_year").value
        let max_year=document.getElementById("max_year").value
        let price=document.getElementById("price").value
        let rent_time_limit=document.getElementById("rent_time_max").value -
        document.getElementById("rent_time_min").value
        let rent_time= 12*(max_year-min_year) + (max_month-min_month)
        console.log(rent_time)
        if (rent_time>rent_time_limit || rent_time<1) {
            document.getElementById("totPrice").innerHTML.value= -1
            return false
        }
        document.getElementById("totPrice").innerHTML.value= rent_time*price
        return true

    })

    console.log(item)
})


function valid_credit_card(value) {
  	if (/[^0-9-\s]+/.test(value)) return false
  	// The Luhn Algorithm. It's so pretty.
  	let nCheck = 0, bEven = false
  	value = value.replace(/\D/g, "")
  	for (var n = value.length - 1; n >= 0; n--) {
  		var cDigit = value.charAt(n),
  			  nDigit = parseInt(cDigit, 10)
  		if (bEven && (nDigit *= 2) > 9) nDigit -= 9
  		nCheck += nDigit
  		bEven = !bEven
  	}
  	return (nCheck % 10) == 0
}
