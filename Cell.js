//Cell object (1 cell assigned to each place in the game)
function Cell(i, j){
    this.i = i;
    this.j = j;
    this.globalIndex = this.i * 3 + this.j;

    this.x = baseX + 100 * i;
    this.y = baseY + 100 * j;
    this.sideLength = 100;
    this.color = [226, 226, 226]; //grey
    this.playerIndex = -1;

    this.taken = false;

    this.Draw = function(){
        fill(this.color);
        rect(this.x, this.y, this.sideLength, this.sideLength);
    }

    this.Update = function(){

        //changes the cell's color whenever the mouse is hovering over it
        if(!this.taken && mouseX > this.x && mouseX < this.x + this.sideLength && mouseY > this.y && mouseY < this.y + this.sideLength){
            if(playerTurn){
                this.color = [202, 252, 159]; //light green
            } else{
                this.color = [252, 202, 159]; //light red
            }

            this.hovering = true;
        }
        else if(!this.taken){
            this.color = [226, 226, 226]; //grey
            this.hovering = false
        }
    
        if(this.taken){
            if(this.color === "green"){
                this.playerIndex = 0;
            }
            else if(this.color === "red"){
                this.playerIndex = 1;
            }
        }
    }
}

function mousePressed(){
    let playerPlayed = false;

    //Makes it so when the user clicks on a cell it becomes either green or red based on the user's color.
    //It also turns this.taken to true, so that it can't be changed until the game resets.
    for(i = 0; i < grid.length; i++){
        for(j = 0; j < grid[i].length; j++){
            if(canClick && grid[i][j].hovering == true && grid[i][j].taken == false){
                grid[i][j].taken = true;
                grid[i][j].color = turnColor;
                playerPlayed = true;
            }
        }
    }

    
    //returns true or false
    let gameHasEnded = HasGameEnded();

    //if someone playes, then it changes whose turn it is
    if(playerPlayed){
        playerTurn = !playerTurn
    }

    //if the game has ended, it changes the upper text to "PlayerX has won", or in the case the
    //game hasn't ended, it changes the text to "PlayerY's Turn".
    if(gameHasEnded && canClick){
        EndScreen();
        gameHasActuallyEnded = true;
        resetClickable = true;
    }
    else if(playerTurn && !gameHasEnded){
        playerText = "Green's turn";
    } 
    else if(!playerTurn && !gameHasEnded){
        playerText = "Red's turn";
    }

    //If the reset button has been clicked, it activates the resetGame() function, resetting the game.
    if(resetClickable && mouseX > buttonReset.x && mouseX < buttonReset.x + buttonReset.width && mouseY > buttonReset.y && mouseY < buttonReset.y + buttonReset.height){
        ResetGame();
    }
}