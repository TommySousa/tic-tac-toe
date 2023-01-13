//&#10005 cross &#9675 circle

// const GameBoard = (() => {
//     const state = {
//         gameBoard: ['', '', '' ,'', '', '', '', '', ''],
//         clearBoard: () => {
//             for(let i = 0; i< state.gameBoard.length; i++){
//                 state.gameBoard[i] = '';
//             };

//         }
//     };

//     return state;
// })();


// const pVp = (state) => {
//     let tiles = document.querySelectorAll('.tile');
//     const gameBoard = GameBoard.gameBoard


//     const gameLogic = () => {
//             if ((player === 1 && window.event.target.innerHTML === '') && !checkWin() && round<11){
//                 console.log(`${player1.getName()} clicked tile number ${window.event.target.id}`)
//                 gameBoard[window.event.target.id] = player1.getSymbol()
//                 console.log(GameBoard.gameBoard)
//                 window.event.target.innerHTML = gameBoard[window.event.target.id];
//                 player++ 
//                 round ++
    
//             } else if((player === 2 && window.event.target.innerHTML === '') && !checkWin() && round<11){
//                 console.log(`${player2.getName()} clicked tile number ${window.event.target.id}`)
//                 gameBoard[window.event.target.id] = player2.getSymbol()
//                 console.log(GameBoard.gameBoard)
//                 window.event.target.innerHTML = gameBoard[window.event.target.id];
//                 player-- 
//                 round ++
                
//             }
//             if (checkWin()){
//                 if (player == 2){
//                     setTimeout(() => {
//                         alert(`Congratulations ${player1.getName()}`)
//                     }, 30)
//                 } else{
//                     setTimeout(() => {
//                         alert(`Congratulations ${player2.getName()}`)
//                    }, 30)
//                 }
//             }
//             if (round == 10 && !checkWin()){
//                 setTimeout(() => {
//                     alert('draw')
//                     tiles.forEach(tile => {
//                         tile.removeEventListener('click', gameLogic)});
//                 }, 30)
               
//             }
//     };  
// };

const renderGame = (gameBoard) => {
    let tiles = document.querySelectorAll('.tile');
    for(let i = 0; i<tiles.length; i++){
        tiles[i].innerHTML = gameBoard[i]
    }; 
};


const onTileClick = (gameContext, evt) => {
    
    if(isGameOver(gameContext)){
        return gameOver(gameContext);
    }  
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
};

const checkWin = (gameBoard) => {
    const winOption = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let i = 0; i <winOption.length; i++){
        if((gameBoard[winOption[i][0]] === gameBoard[winOption[i][1]]) && (gameBoard[winOption[i][0]] === gameBoard[winOption[i][2]]) && (gameBoard[winOption[i][0]] !== '')){
            console.log(`The winner is ${gameBoard[winOption[i][0]]}`)
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
    
    // const clickRestart = (evt) =>{
    //     onRestart(gameContext, evt);
    // }
    // add event listeners
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
};

const isGameOver = (gameContext) =>{
    if(checkWin(gameContext.gameBoard)){
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

    window.gameContext = gameContext;
};

init();

