const grid_boxes = document.querySelectorAll(".grid-box");
const overlay = document.querySelector(".overlay");
let flag = 1; // 1 denotes X 

var gameBoard = []; // Declare a 2-D Array to represent each grid-box position

for (let i = 0; i < 3; i++) {
    gameBoard[i] = [];  // Declare an empty array for each row
}

grid_boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(!gameBoard[box.dataset.rowValue][box.dataset.columnValue]){ // checks if the grid box has already been filled
            if (flag == 1) { // first player's turn
                box.style.backgroundColor = "#FF6347";
                box.querySelector(".fa-times").style.display = "block";
                box.querySelector(".fa-circle").style.display = "none"; // Hide circle
                box.querySelector(".fa-times").style.color = "#FFFF";
                box.style.textShadow = "4px 0px 10px #4242426c";
                gameBoard[box.dataset.rowValue][box.dataset.columnValue] = "X";
                
                if (checkWin("X") == true) {
                    overlay.style.display = "flex";
                    document.querySelector(".overlay .text").innerHTML = "Player X has Won!";
                } else {
                    checkDraw();
                }
                
                flag = 0;
            } else { // second player's turn
                box.style.backgroundColor = "#F1C104";
                box.querySelector(".fa-circle").style.display = "block";
                box.querySelector(".fa-times").style.display = "none"; // Hide X
                box.querySelector(".fa-circle").style.color = "#FFFF";
                box.style.textShadow = "4px 0px 10px #4242426c";
                gameBoard[box.dataset.rowValue][box.dataset.columnValue] = "O";
                
                if (checkWin("O") == true) {
                    overlay.style.display = "flex";
                    document.querySelector(".overlay .text").innerHTML = "Player O has Won!";
                } else {
                    checkDraw();
                }
                
                flag = 1;
            }
        }
    });
});

function checkWin(player) {
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (gameBoard[row][0] === player && gameBoard[row][1] === player && gameBoard[row][2] === player) {
            return true; // Player wins
        }
    }
    
    // Check columns
    for (let col = 0; col < 3; col++) {
        if (gameBoard[0][col] === player && gameBoard[1][col] === player && gameBoard[2][col] === player) {
            return true; // Player wins
        }
    }
    
    // Check main diagonal
    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player) {
        return true; // Player wins
    }
    
    // Check anti-diagonal
    if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player) {
        return true; // Player wins
    }
  
    return false; // No one wins 
}

function checkDraw() {
    let draw = true;
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (!gameBoard[row][col]) {
                draw = false; // Found an empty space, not a draw
                break; // Exit the inner loop
            }
        }
        if (!draw) {
            break; // Exit the outer loop if an empty space is found
        }
    }
    
    if (draw) {
        overlay.style.display = "flex";
        document.querySelector(".overlay .text").innerHTML = "Oops! It's a Draw";
    }
}

function refresh() {
    window.location.href = "index.html";
}