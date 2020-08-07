$( document ).ready(function() {
    function createGrid() {
        tableHtml = "<table>"
        for(var i = 0; i < 15; i++) {
            tableHtml += "<tr>"
            for(var j = 0; j < 15; j++) {
                tableHtml += "<td><input type='text'/></td>"
            }
            tableHtml += "</tr>"
        }
        tableHtml += "</table>"
        $("#crossword").html(tableHtml)
    }
    createGrid()
});