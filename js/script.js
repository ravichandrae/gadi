$( document ).ready(function() {

    //Two dimentional array to hold cell data
    var cellArray;

    function createGrid() {
        var gridSize = getGridSize();

        var cellNumber = 1;
        tableHtml = "<table id='grid'>"
        for(var i = 0; i < gridSize; i++) {
            tableHtml += "<tr>"
            for(var j = 0; j < gridSize; j++) {
                if( cellArray[i][j].free ) {
                    tableHtml += "<td row='"+ i + "' col='" + j + "'>" +
                                    "<div>" + cellNumber + "</div>" + 
                                    "<input class='char' type='text' value='' maxlength='8'/> " +
                                "</td>"
                    cellNumber++
                } else {
                    tableHtml += "<td class='blocked-cell' row='"+ i + "' col='" + j + "'>" +
                                    "<input class='char' type='text' value='' maxlength='8'/> " +
                                "</td>"
                }
            }
            tableHtml += "</tr>"
        }
        tableHtml += "</table>"
        $("#crossword").html(tableHtml)

         //Click event handler for each cell
        $("#grid").on('click', 'td', function() {
            var row = $(this).attr('row')
            var column= $(this).attr('col')
            cellArray[row][column].free = !cellArray[row][column].free
            createGrid()
            //$("#"+id).css("background-color", "grey")
        });
    }

    //Initializing Two dimentional cell array
    function initCellArray() {
        var gridSize = getGridSize();
        cellArray = []
        for(var i = 0; i < gridSize; i++) {
            var gridRow = []
            for(var j = 0; j < gridSize; j++) {
                gridRow.push({"free": true})
            }
            cellArray.push(gridRow)
        }
    }

    function getGridSize() {
        var gridSize = 15;
        var inputGridSize = $("#gridSize").val()
        if( inputGridSize != '') {
            gridSize = parseInt(inputGridSize)
        }
        return gridSize
    }

    initCellArray()
    createGrid()
});