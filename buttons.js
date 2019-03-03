let playerText = "Green's turn";
let canClick = true;
let resetClickable = false;

let buttonReset;
buttonReset = new ButtonReset();


function ButtonReset(){
    
    this.width = 70;
    this.height = 40;
    this.x = baseX - this.width - 5;
    this.y = baseY + 300 - this.height;


    this.Draw = function(){
        fill(turnColor);
        rect(this.x, this.y, this.width, this.height);
        fill(255);
        textSize(20);
        text("Reset", this.x + this.width/2, this.y + this.height/2);
    }
}

//Changes the upper text to "PlayerX has won".
function EndScreen(){
    if(player1Won){
        playerTurn = true;
        playerText = "Green has won";
        player1Score++;
    }
    else if(player2Won){
        playerTurn = false;
        playerText = "Red has won";
        player2Score++;
    }
    else if (gameTied) {
        playerText = "Tie";
    }

    canClick = false;

}

function ResetGame(){

    //Resets all the cells
    for(i = 0; i < grid.length; i++){
        for(j = 0; j < grid[0].length; j++){
            grid[i][j].color = [0,0,0];
            grid[i][j].taken = false;
            console.log("<-- this should be a 9");
        }
    }


    
    gameHasEnded = false;
    gameHasActuallyEnded = false;
    player1won = false;
    player2Won = false;
    canClick = true;
    playerTurn = !playerTurn;
    resetClickable = false;

    if (playerTurn) {
        playerText = "Green's turn";
    }
    else{
        playerText = "Red's turn";
    }
}