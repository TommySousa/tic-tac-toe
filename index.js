//&#10005 cross &#9675 circle

const renderGame = (gameBoard) => {
    let tiles = document.querySelectorAll('.tile');
    for(let i = 0; i<tiles.length; i++){
        tiles[i].innerHTML = gameBoard[i]
    }; 
};

const showPopUp = () => {
    const popUp = document.querySelectorAll('.pop-up')[0];
    const addHtml = `<p>CONGRATULATIONS</p> <p> The game is over!</p>`
    popUp.innerHTML +=addHtml;
    popUp.style.display="flex";
    setInterval(removePop, 3000);
    function removePop() {
        popUp.innerHTML = '';
        popUp.style.display = 'none';
    };
}


const onTileClick = (gameContext, evt) => {
    

    const idTile = evt.target.id;
    // loop logic
    if((gameContext.playerPlaying === null && gameContext.gameBoard[idTile] === '')){
        gameContext.gameBoard[idTile] = gameContext.playerA.getSymbol();
        gameContext.playerPlaying = 1;

    } else if ((gameContext.playerPlaying === 1 && gameContext.gameBoard[idTile] === '')){
        gameContext.gameBoard[idTile] = gameContext.playerB.getSymbol();
        gameContext.playerPlaying = null; 
    }

    renderGame(gameContext.gameBoard)
    if(checkWin(gameContext)){
        return gameOver(gameContext);
    }  

    
};

const checkWin = (gameContext) => {
    const winOption = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    let winner = gameContext.winningPlayer;

    for (let i = 0; i <winOption.length; i++){
        if((gameContext.gameBoard[winOption[i][0]] === gameContext.gameBoard[winOption[i][1]]) && (gameContext.gameBoard[winOption[i][0]] === gameContext.gameBoard[winOption[i][2]]) && (gameContext.gameBoard[winOption[i][0]] !== '')){ 
            return true
        }
    }   
    return false 
};

const createPlayer = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    return {getName, getSymbol};
};

const createGame = (playerA, playerB) => {
    const gameContext = {
        playerA,
        playerB,
        round: 0,
        gameBoard: ['', '', '' ,'', '', '', '', '', ''],
        playerPlaying: null,
        winningPlayer: null,

        clickEventFn: (evt) => {
            onTileClick(gameContext, evt);
        },
        clickRestart : (evt) =>{
            onRestart(gameContext, evt);
         }

    };

    const tiles = document.querySelectorAll('.tile');
    const restartBtn = document.getElementById('restart');

    tiles.forEach(tile => {
        tile.addEventListener('click', gameContext.clickEventFn);
    });
    restartBtn.addEventListener('click', gameContext.clickRestart);

    return gameContext;
};

const gameOver = (gameContext) => {
    // remove event listeners
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.removeEventListener('click', gameContext.clickEventFn)});
    showPopUp(gameContext.winningPlayer)
};

const isGameOver = (gameContext) =>{
    if(checkWin(gameContext)){
        return true
    } 
    for (let i = 0; i<gameContext.gameBoard.length; i++){
        if(gameContext.gameBoard[i] === ''){
            return false
        }
    } 
    return true
};

const onRestart = (gameContext) =>{
    document.getElementById('restart').removeEventListener('click', gameContext.clickRestart)
    const newCtx = createGame(gameContext.playerA, gameContext.playerB);
    renderGame(newCtx.gameBoard);   
}


const init = () => {
    const you = createPlayer('&#10005', 'You');
    const yourFriend = createPlayer('&#9675', 'Your Friend');
    
    let gameContext = createGame(you, yourFriend);

    //for debugging purposes
    window.gameContext = gameContext;
};

init();

