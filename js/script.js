$( document ).ready(function() {

    var action = "mark"
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
                    if( needCellNumber(i, j) ) {
                        tableHtml += "<td row='"+ i + "' col='" + j + "'>" +
                                        "<div class='cellNumContainer'>" + cellNumber + "</div>" +
                                        "<input row='"+ i + "' col='" + j + "' class='char' type='text' value='" +
                                          cellArray[i][j].letter + "' maxlength='8'/> " +
                                     "</td>"
                        cellNumber++
                    } else {
                        tableHtml += "<td row='"+ i + "' col='" + j + "'>" +
                                        "<input row='"+ i + "' col='" + j + "' class='char' type='text' value='" +
                                          cellArray[i][j].letter + "'maxlength='8'/> " +
                                     "</td>"
                    }
                } else {
                    tableHtml += "<td class='blocked-cell' row='"+ i + "' col='" + j + "'>" +
                                    "<input row='"+ i + "' col='" + j + "' class='char' type='text' value='' maxlength='8'/> " +
                                 "</td>"
                }
            }
            tableHtml += "</tr>"
        }
        tableHtml += "</table>"
        $("#crossword").html(tableHtml)

        if(action == "mark") {
            //Click event handler for each cell
            $("#grid").on('click', 'td', function() {
                var row = $(this).attr('row')
                var column= $(this).attr('col')
                cellArray[row][column].free = !cellArray[row][column].free
                if(!cellArray[row][column].free) {
                    cellArray[row][column].text = ""
                }
                createGrid()
            });
        }

        if(action == "fill") {
            //Click event handler for each textbox
            $("#grid").on('focusout', 'input', function() {
                var row = $(this).attr('row')
                var column= $(this).attr('col')
                cellArray[row][column].letter = $(this).val()
            });
        }
    }

    $('input[type=radio][name=markfill]').on('change', function() {
        switch ($(this).val()) {
          case 'mark':
            action = "mark"
            break;
          case 'fill':
            action = "fill"
            break;
        }
        createGrid()
    });

    //Initializing Two dimentional cell array
    function initCellArray() {
        var gridSize = getGridSize();
        cellArray = []
        for(var i = 0; i < gridSize; i++) {
            var gridRow = []
            for(var j = 0; j < gridSize; j++) {
                gridRow.push({"free": true, "letter": ""})
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

    function needCellNumber(i, j) {
        var gridSize = getGridSize()

        //Check if left cell is blocked
        var leftCellBlocked = false
        if(j < 1 || !cellArray[i][j-1].free) {
            leftCellBlocked = true
        }

        //check if top cell is blocked
        var topCellBlocked = false
        if(i < 1 || !cellArray[i-1][j].free) {
            topCellBlocked = true
        }

        //check if right cell is blocked
        var rightCellBlocked = false
        if(j == (gridSize - 1 ) || !cellArray[i][j+1].free) {
            rightCellBlocked = true
        }

        //check if bottom cell is blocked
        var bottomCellBlocked = false
        if(i == (gridSize - 1 ) || !cellArray[i+1][j].free) {
            bottomCellBlocked = true
        }
        //Single cell, Island cell surrounded by blocked cells. we need number
        if(leftCellBlocked && rightCellBlocked && topCellBlocked & bottomCellBlocked)
            return true
        //We need number for column
        if(topCellBlocked && !bottomCellBlocked)
            return true
        //we need number for row
        if(leftCellBlocked && !rightCellBlocked)
            return true
        return false
    }

    initCellArray()
    createGrid()
});