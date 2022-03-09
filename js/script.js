let hoverCells = document.querySelectorAll('.hover-cells'),
    hoverContainer = document.querySelector('#hover-pieces'),
    droppedPieces = document.querySelectorAll('.drop-piece'),
    columnArr = document.querySelectorAll('#board > ul'),
    startGame = false,
    finished = false,
    startButton = document.querySelector('.start-button'),
    gameBlocker = document.querySelector('#blocker'),
    choiceButton = document.querySelector('.choice-button'),
    yesButton = document.querySelector('.yes'),
    noButton = document.querySelector('.no'),
    oneRecord = document.querySelector('.player-one .record'),
    twoRecord = document.querySelector('.player-two .record'),
    player1Elem = document.querySelector('.player-one p:first-of-type'),
    player2Elem = document.querySelector('.player-two p:first-of-type'),
    startTurn = Math.floor(Math.random() * 2),
    winnerTurn = '',
    playerTurn = (startTurn == 0) ? 'blue' : 'red',
    playerInfo = {
        player1: 'Player 1',
        player2: 'Player 2',
        oneWin: 0,
        oneLoss: 0,
        twoWin: 0,
        twoLoss: 0
    },
    twoBoard = [['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', '']];



document.addEventListener('DOMContentLoaded', () => {

    nameInput1();
    nameInput2();

    player1Elem.innerHTML = `${playerInfo.player1}`;
    player2Elem.innerHTML = `${playerInfo.player2}`;

    oneRecord.innerHTML = `${playerInfo.oneWin} - ${playerInfo.oneLoss}`;
    twoRecord.innerHTML = `${playerInfo.twoWin} - ${playerInfo.twoLoss}`;

    if (startTurn == 0) {
        hoverCells.forEach((curr) => {
            curr.classList.add('blue');
        });
    } else {
        hoverCells.forEach((curr) => {
            curr.classList.add('red');
        });
    }
});


startButton.addEventListener('click', () => {

    if (startGame == false) {
        gameBlocker.style.height = '0';
        startButton.innerHTML = '<button> Restart </button>';
        startGame = true;
    } else if (startGame == true && finished == true) {
        null;
    } else if (startGame == true && finished == false) {
        resetBoard();
    }

});

yesButton.addEventListener('click', () => {
    resetBoard();
    gameBlocker.style.height = '0';
    choiceButton.style.visibility = 'hidden';
    finished = false;
});

noButton.addEventListener('click', () => {
    resetBoard();
    choiceButton.style.visibility = 'hidden';
    startGame = false;
    startButton.innerHTML = '<button> Start Game </button>';
    finished = false;
});




function nameInput1() {
    playerInfo.player1 = prompt('Enter Name Of Player One  ( Keep Name Under 10 Characters )');

    console.log(playerInfo.player1);
    if (playerInfo.player1 == null ) { playerInfo.player1 = 'Player 1' } 
    else if (playerInfo.player1.length > 10) { nameInput1() }
    else { return }
}

function nameInput2() {
    playerInfo.player2 = prompt('Enter Name Of Player Two  ( Keep Name Under 10 Characters )');

    if (playerInfo.player2 == null) { playerInfo.player2 = 'Player 2' } 
    else if (playerInfo.player2.length > 10) { nameInput2() }
    else { return }
}


function resetBoard() {
    twoBoard = [['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', ''], 
                ['', '', '', '', '', '']];

    droppedPieces.forEach((curr) => {
        curr.remove();
    });

    console.log(twoBoard);
}



hoverCells.forEach((curr) => {
    curr.addEventListener('click', () => {

        let cellPosition = cellInfo(curr);
        fillCell(curr);
        dropPiece(curr, cellPosition);
        let verticalWin = verticalCheck();
        let horizontalWin = horizontalCheck();
        let diaLeftWin = leftToRight();
        let diaRightWin = rightToLeft();

        if (verticalWin == 'blue' || horizontalWin == 'blue' || diaLeftWin == 'blue' || diaRightWin == 'blue') { 
            setTimeout(() => { 
                alert('Blue Wins'); 
                startButton.innerHTML = '<button> Rematch </button>'; 
                choiceButton.style.visibility = 'visible';
            },500); 
            finished = true;
            gameBlocker.style.height = 'calc(100% / 6)';
            playerInfo.oneWin += 1;
            playerInfo.twoLoss += 1;
            oneRecord.innerHTML = `${playerInfo.oneWin} - ${playerInfo.oneLoss}`;
            twoRecord.innerHTML = `${playerInfo.twoWin} - ${playerInfo.twoLoss}`;
            
        } else if (verticalWin == 'red' || horizontalWin == 'red' || diaLeftWin == 'red' || diaRightWin == 'red') { 
            setTimeout(() => { 
                alert('Red Wins'); 
                startButton.innerHTML = '<button> Rematch </button>'; 
                choiceButton.style.visibility = 'visible';
            },500); 
            finished = true;
            gameBlocker.style.height = 'calc(100% / 6)';
            playerInfo.twoWin += 1;
            playerInfo.oneLoss += 1;
            oneRecord.innerHTML = `${playerInfo.oneWin} - ${playerInfo.oneLoss}`;
            twoRecord.innerHTML = `${playerInfo.twoWin} - ${playerInfo.twoLoss}`;

        }

        if (finished == true) {
            null;
        } else {
            hoverCells.forEach((curr) => {
                if (curr.classList.contains('blue')) {
                    playerTurn = 'red';
                    curr.classList.remove('blue');
                    curr.classList.add('red');
                } else {
                    playerTurn = 'blue';
                    curr.classList.remove('red');
                    curr.classList.add('blue');
                }
            });
        }

        droppedPieces = document.querySelectorAll('.drop-piece');
    });
});













// PLAYER PIECE

class Cell {
    constructor(elem1, elem2) {
        this.elem1 = elem1;
        this.elem1Info = elem1.getBoundingClientRect();
        this.elem2 = elem2;
        this.elem2Info = elem2.getBoundingClientRect();
    }

    draw() {
        let nCell = document.createElement('span');
        this.elem1.appendChild(nCell);
        nCell.className = 'drop-piece';

        if (playerTurn == 'blue') {
            nCell.style.backgroundColor = 'rgb(3, 23, 252)';
        } else {
            nCell.style.backgroundColor = 'rgb(133, 19, 19)';
        }

        setTimeout(() => {
            nCell.style.transform = `translateY(${this.elem2Info.top - this.elem1Info.top}px)`;
        },300);
    }

}















// FILL 2D ARRAY

function fillCell(elem) {
    let col = parseInt(elem.dataset.index);

    for (let i = twoBoard[col].length - 1; i >= 0; i--) {
        if (twoBoard[col][i].length == 0 && playerTurn == 'blue') { twoBoard[col][i] = 'blue'; return null; }
        else if (twoBoard[col][i].length == 0 && playerTurn == 'red') { twoBoard[col][i] = 'red'; return null; }
    }
}

// FINDS EMPTY CELL IN 2D ARRAY

function cellInfo(elem) {
    let col = parseInt(elem.dataset.index);

    for (let i = twoBoard[col].length - 1; i >= 0; i--) {
        if (twoBoard[col][i].length == 0) { return i; }
    }
}


// DROP NEW PIECE INTO PLACE

function dropPiece(elem1, elem2) {
    let column = parseInt(elem1.dataset.index),
        row = elem2;

    let newCell = new Cell(elem1, columnArr[column].children[row]);

    newCell.draw();
}





















// CHECK VERTICALLY FOR WIN

function verticalCheck() {
    let red = 0,
        blue = 0,
        winner = '';

    for (let i = 0; i < twoBoard.length; i++) {

        for (let x = twoBoard[i].length - 1; x >= 0; x--) {
        
            if (red == 4) { winner = 'red'; break; }
            else if (blue == 4) { winner = 'blue'; break; }

            if (x == twoBoard[i].length - 1) {
                if (twoBoard[i][x] == 'blue') { blue++ }
                else if (twoBoard[i][x] == 'red') { red++ }
            } else {
                if (twoBoard[i][x] == 'blue' && twoBoard[i][x + 1] == 'blue') { blue++ }
                else if (twoBoard[i][x] == 'blue' && twoBoard[i][x + 1] == 'red') { blue = 1; red = 0; }
                else if (twoBoard[i][x] == 'red' && twoBoard[i][x + 1] == 'red') { red++ }
                else if (twoBoard[i][x] == 'red' && twoBoard[i][x + 1] == 'blue') { red = 1; blue = 0; }
            }

        }
        if (winner.length == 0) { red = 0; blue = 0; }
    }
    return winner;
}




// CHECK HORIZONTALLY FOR WIN

function horizontalCheck() {
    let red = 0,
        blue = 0,
        winner = '';

    for (let i = 5; i >= 0; i--) {
        
        for (let x = 0; x < twoBoard.length; x++) {
            if (red == 4) { winner = 'red'; break; }
            else if (blue == 4) { winner = 'blue'; break; }

            if (x == 0) {
                if (twoBoard[x][i] == 'blue') { blue++ }
                else if (twoBoard[x][i] == 'red') { red++ }
            } else {
                if (twoBoard[x][i] == 'blue' && twoBoard[x - 1][i] == 'blue') { blue++ }
                else if (twoBoard[x][i] == 'blue' && twoBoard[x - 1][i] == 'red') { blue = 1; red = 0; }
                else if (twoBoard[x][i] == 'blue' && twoBoard[x - 1][i] == '') { blue = 1; red = 0; }
                else if (twoBoard[x][i] == 'red' && twoBoard[x - 1][i] == 'red') { red++ }
                else if (twoBoard[x][i] == 'red' && twoBoard[x - 1][i] == 'blue') { red = 1; blue = 0; }
                else if (twoBoard[x][i] == 'red' && twoBoard[x - 1][i] == '') { blue = 0; red = 1; }
            }
        }
        if (winner.length == 0) { red = 0; blue = 0; }
    }
    return winner;
}




// CHECK DIAGONAL (LEFT TO RIGHT) FOR WIN

function leftToRight() {
    let red = 0,
        blue = 0,
        winner = '',
        diaColumn = 0,
        diaWhile = false,
        diaLimit = 0,
        x = 3;

    for (let i = 0; i < 4; i++) {

        while (x <= 5) {
            for (let z = x; z >= 0; z--) {
                if (red == 4) { winner = 'red'; break; }
                else if (blue == 4) { winner = 'blue'; break; }

                if (diaColumn == 0) {
                    if (twoBoard[diaColumn][z] == 'blue') { blue++ }
                    else if (twoBoard[diaColumn][z] == 'red') { red++ }
                    diaColumn++;
                } else {
                    if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn - 1][z + 1] == 'blue') { blue++ }
                    else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn - 1][z + 1] == 'red') { blue = 1; red = 0; }
                    else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn - 1][z + 1] == '') { blue = 1; red = 0; }
                    else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn - 1][z + 1] == 'red') { red++ }
                    else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn - 1][z + 1] == 'blue') { red = 1; blue = 0; }
                    else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn - 1][z + 1] == '') { blue = 0; red = 1; }
                    diaColumn++;
                }
            }
            if (red == 4) { winner = 'red' }
            else if (blue == 4) { winner = 'blue' }

            if (winner.length == 0) { red = 0; blue = 0; diaColumn = 0; }
            else { break }
            x++;
        }
        diaWhile = true;
        if (diaWhile == true && i == 0) { diaColumn = 1 }
        else if (diaWhile == true && i > 0) { diaColumn = i }

        if (winner.length > 0) { break }
        else if (i == 0) { continue }

        for (let z = 5; z >= diaLimit; z--) {
            if (red == 4) { winner = 'red'; break; }
            else if (blue == 4) { winner = 'blue'; break; }

            if (z == 5) {
                if (twoBoard[diaColumn][z] == 'blue') { blue++ }
                else if (twoBoard[diaColumn][z] == 'red') { red++ }
            } else {
                if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn - 1][z + 1] == 'blue') { blue++ }
                else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn - 1][z + 1] == 'red') { blue = 1; red = 0; }
                else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn - 1][z + 1] == '') { blue = 1; red = 0; }
                else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn - 1][z + 1] == 'red') { red++ }
                else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn - 1][z + 1] == 'blue') { red = 1; blue = 0; }
                else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn - 1][z + 1] == '') { blue = 0; red = 1; }
            }
            diaColumn++;
        }
        diaLimit++;

        if (red == 4) { winner = 'red' }
        else if (blue == 4) { winner = 'blue' }

        if (winner.length == 0) { red = 0; blue = 0; diaColumn = 1; }
    }
    return winner;
}









// CHECK DIAGONAL (RIGHT TO LEFT) FOR WIN

function rightToLeft() {
    let red = 0,
        blue = 0,
        winner = '',
        diaColumn = 6,
        diaWhile = false,
        diaLimit = 0,
        x = 3;

    for (let i = 6; i >= 3; i--) {

        while (x <= 5) {
            for (let z = x; z >= 0; z--) {
                if (red == 4) { winner = 'red'; break; }
                else if (blue == 4) { winner = 'blue'; break; }

                if (diaColumn == 6) {
                    if (twoBoard[diaColumn][z] == 'blue') { blue++ }
                    else if (twoBoard[diaColumn][z] == 'red') { red++ }
                    diaColumn--;
                } else {
                    if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn + 1][z + 1] == 'blue') { blue++ }
                    else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn + 1][z + 1] == 'red') { blue = 1; red = 0; }
                    else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn + 1][z + 1] == '') { blue = 1; red = 0; }
                    else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn + 1][z + 1] == 'red') { red++ }
                    else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn + 1][z + 1] == 'blue') { red = 1; blue = 0; }
                    else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn + 1][z + 1] == '') { blue = 0; red = 1; }
                    diaColumn--;
                }
            }
            if (red == 4) { winner = 'red' }
            else if (blue == 4) { winner = 'blue' }

            if (winner.length == 0) { red = 0; blue = 0; diaColumn = 6; }
            else { break }
            x++;
        }
        diaWhile = true;
        if (diaWhile == true && i == 6) { diaColumn = 5 }
        else if (diaWhile == true && i < 6) { diaColumn = i }

        if (winner.length > 0) { break }
        else if (i == 6) { continue }

        for (let z = 5; z >= diaLimit; z--) {
            if (red == 4) { winner = 'red'; break; }
            else if (blue == 4) { winner = 'blue'; break; }

            if (z == 5) {
                if (twoBoard[diaColumn][z] == 'blue') { blue++ }
                else if (twoBoard[diaColumn][z] == 'red') { red++ }
            } else {
                if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn + 1][z + 1] == 'blue') { blue++ }
                else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn + 1][z + 1] == 'red') { blue = 1; red = 0; }
                else if (twoBoard[diaColumn][z] == 'blue' && twoBoard[diaColumn + 1][z + 1] == '') { blue = 1; red = 0; }
                else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn + 1][z + 1] == 'red') { red++ }
                else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn + 1][z + 1] == 'blue') { red = 1; blue = 0; }
                else if (twoBoard[diaColumn][z] == 'red' && twoBoard[diaColumn + 1][z + 1] == '') { blue = 0; red = 1; }
            }
            diaColumn--;
        }

        diaLimit++;

        if (red == 4) { winner = 'red' }
        else if (blue == 4) { winner = 'blue' }

        if (winner.length == 0) { red = 0; blue = 0; }
    }
    return winner;
}