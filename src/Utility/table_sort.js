function onSortItemClick(index){
    /* chooses which index the table sort will use 0-5 each one has different functionality,
    even indexes are ascending order odd indexes are decending order  */
    switch (index) {
    case 0:
        sortTable("0","string","asc")
        break
    case 1:
        sortTable("0","string","des")
        break
    case 2:
        sortTable("1","number","asc")
        break
    case 3:
        sortTable("1","number","des")
        break
    case 4:
        sortTable("2","number","asc")
        break
    case 5:
        sortTable("2","number","des")
        break
    default:
        break
    }
}

function shouldSwitch(order,column_num,i,type,rows) {
    /* Get the two elements you want to compare,
    one from current row and one from the next: */
    let x = rows[i].getElementsByTagName("TD")[column_num]
    let y = rows[i + 1].getElementsByTagName("TD")[column_num]
    // Check if the two rows should switch place:
    let val1 = type == "number" ? parseInt(x.innerHTML.toLowerCase()) : x.innerHTML.toLowerCase()
    let val2 = type == "number" ? parseInt(y.innerHTML.toLowerCase()) : y.innerHTML.toLowerCase()
    return (order == "asc" && val1 > val2) || (order == "des" && val1 < val2)
}

function sortTable(column_num,type,order) {
    /* params: column number: column to sort,type: the data type to sort, order decending or ascending
    (using the short term "asc" or dec") */
    let rows
    let table = document.getElementById("unitsTable")
    let switching = true
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false
        rows = table.rows
        /* Loop through all table rows (except the
      first, which contains table headers): */
        for (var i = 1; i < (rows.length - 1); i++) {
            if (shouldSwitch(order,column_num,i,type,rows)) {
                // If so, mark as a switch and break the loop:
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                break
            }
        }
    }
    Index = -1
}
