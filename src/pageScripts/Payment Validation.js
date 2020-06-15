
const bookForm = document.querySelector("#transactionForm")
bookForm.addEventListener("submit", (e) => {
    // handle second (inner) form for payment.
    e.preventDefault()
    let form=document.getElementById("transactionForm").elements
    let transaction_data= formJSONify(form)          
    transaction_data["total_price"]=document.getElementById("totPrice").value

    if (!valid_credit_card(transaction_data["CreditCardNumber"])) {
    //if credit card is incorrect or the price is incorrect
        alert("credit card is invalid!")
        return false
    }
    //assume a transaction happened and we got the id:
    transaction_data["transaction_id"]=transaction(transaction_data)
    alert("transaction was successful!!")
    document.getElementById("transaction_id").value=  transaction_data["transaction_id"]
    document.getElementById("submitOrderButton").disabled = false //enables ordering.
})

function transaction(order_data) {
    //Placeholder for transaction since we are not going to implement actual transactions.
    return (Math.floor(Math.random() * (10000000000000000000 - 10000000) )
    + 10000000).toString(36).substring(2,30)
}

// listeners for changing the price:
var min_month= document.getElementById("min_month")
var max_month=document.getElementById("max_month")
var min_year=document.getElementById("min_year")
var max_year=document.getElementById("max_year")

var range= [min_month,max_month, min_year,max_year]
range.forEach(item => {
    item.addEventListener("change", (e) => {
        //variables:
        let min_month= document.getElementById("min_month").value
        let max_month=document.getElementById("max_month").value
        let min_year=document.getElementById("min_year").value
        let max_year=document.getElementById("max_year").value
        let price = document.getElementById("price").value
        let rent_time_limit=document.getElementById("rent_time_max").value
        let min_rent_time =document.getElementById("rent_time_min").value
        let rent_time= 12*(max_year-min_year) + (max_month-min_month)
        // if rent time is invalid:
        if (rent_time >rent_time_limit || rent_time<1 || rent_time<min_rent_time) {
            document.getElementById("totPrice").value= "Error"
            document.getElementById("submitTransactionButton").disabled = true
            return false
        }
        //if rent time is valid:
        document.getElementById("totPrice").value= rent_time*price
        document.getElementById("submitTransactionButton").disabled = false
        return true
    })
})

function valid_credit_card(value) {
    // calculated if the credit card is considered real or not.
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
