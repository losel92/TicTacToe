let canvasWidth = 1350,
    canvasHeight = 550,
    baseX = canvasWidth / 2 - 150,
    baseY = canvasHeight / 2 - 150,
    playerTurn = true,
    globaltTurn = true;
    turnColor = "green",
    gameHasEnded = false;
    gameHasActuallyEnded = false;
    player1Score = 0,
    player2Score = 0;

function Get2DArray(i, j){
    let myArray = Array(i);

    for(x = 0; x < j; x++){
        myArray[x] = Array(j);
    }

    return myArray;
}

let grid = Get2DArray(3, 3);

for(i = 0; i < grid.length; i++){
    for(j = 0; j < grid[i].length; j++){
        grid[i][j] = new Cell(i, j);
    }
}

function setup(){
    createCanvas(canvasWidth, canvasHeight);

    textFont("Arial");
    textAlign(CENTER, CENTER);
}

function draw(){
    background(200);

    strokeWeight(2);
    textStyle("bold");
    //noStroke();

    for(i = 0; i < grid.length; i++){
        for(j = 0; j < grid[i].length; j++){
            grid[i][j].Draw();
            grid[i][j].Update();
        }
    }

    if(playerTurn){
        turnColor = "green";
    } else if (!playerTurn){
        turnColor = "red";
    }
    
    if(gameHasActuallyEnded){
        buttonReset.Draw();
    }

    //Text on top of the grid
    textSize(50);
    fill(turnColor);
    text(playerText, canvasWidth / 2, 60);

    //Score Text
    fill("black");
    text("Score", 100, 50);
    fill("green");
    text("Player 1: " + player1Score, 180, 150);
    fill("red");
    text("Player 2: " + player2Score, 180, 250);
}

//checks if anyone has won the game
function HasGameEnded(){
    player1Won = false;
    player2Won = false;
    gameTied = false;
    ableTo = true;


    //check horizontally
    for(i = 0; i < grid.length; i ++){
        if(grid[i][0].taken && grid[i][0].color == grid[i][1].color && grid[i][1].color == grid[i][2].color){
            if (grid[i][0].color == "green"){
                //alert("Player 1 has won");
                player1Won = true;
                return true;
            }
            else{
                //alert("player 2 has won");
                player2Won = true;
                return true;
            }
        } 
    }

    //check vertically
    for(j = 0; j < grid[0].length; j++){
        if(grid[0][j].taken && grid[0][j].color == grid[1][j].color && grid[1][j].color == grid[2][j].color){
            if (grid[0][j].color == "green"){
                //alert("Player 1 has won");
                player1Won = true;
                return true;
            }
            else{
                //alert("player 2 has won");
                player2Won = true;
                return true;
            }
        }
    }

    //checks diagonally
    if((grid[0][0].taken && grid[0][0].color == grid[1][1].color && grid[1][1].color == grid[2][2].color) || (grid[0][2].taken && grid[0][2].color == grid[1][1].color && grid[1][1].color == grid[2][0].color)){
        if (grid[1][1].color === "green"){
            //alert("Player 1 has won");
            player1Won = true;
            return true;
        }
        else{
            //alert("player 2 has won");
            player2Won = true;
            return true;
        }
    }

    //Checks to see if the game is tied
    for(i = 0, colorCount = 0; i < grid.length; i++){
        for(j = 0; j < grid[i].length; j++){

            if (grid[i][j].color == "red" || grid[i][j].color == "green") {
                colorCount++;
                console.log(colorCount);
            }
        }
    }
    if (colorCount == 9 && !player1Won && !player2Won) {
        gameTied = true;
        console.log("game tied");
        return true;
    }
}

//Simple sleep function from stack overflow
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}