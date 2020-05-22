function onSortItemClick(index){
    console.log("onSortItemClick " + index)
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

function sortTable(column_num,type,order) {
    var table, rows, switching, i, x, y, shouldSwitch, val1, val2
    table = document.getElementById("unitsTable")
    switching = true
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false
        rows = table.rows
        /* Loop through all table rows (except the
      first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
            shouldSwitch = false
            /* Get the two elements you want to compare,
        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[column_num]
            y = rows[i + 1].getElementsByTagName("TD")[column_num]
            console.log(x.innerHTML + y.innerHTML)
            // Check if the two rows should switch place:
            val1 = type == "number" ? parseInt(x.innerHTML.toLowerCase()) : x.innerHTML.toLowerCase()
            val2 = type == "number" ? parseInt(y.innerHTML.toLowerCase()) : y.innerHTML.toLowerCase()
            if (order == "asc" && val1 > val2) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true
                break
            }
            else if (order == "des" && val1 < val2) {
                shouldSwitch = true
                break
            }
          }
          if (shouldSwitch) {
              /* If a switch has been marked, make the switch
              and mark that a switch has been done: */
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
              switching = true
          }
    }
    table.selectedIndex = -1
}
