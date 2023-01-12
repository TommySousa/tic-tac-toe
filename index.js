//&#10005 cross &#9675 circle

const GameBoard = (() => {
    let gameBoard =  ['', '', '' ,'', '', '', '', '', ''];
    let tiles = document.querySelectorAll('.tile');

    // const renderPlay = () => {
    //     for(let i = 0; i<tiles.length; i++){
    //         tiles[i].innerHTML = gameBoard[i];
    //     };     
    // };

    return {gameBoard};
})();

const gameController = (player1, player2) => {
    let tiles = document.querySelectorAll('.tile');
    let player = 1;

    tiles.forEach(tile => {
        tile.addEventListener('click', () =>{
            if (player === 1){
                console.log(`${player1.getName()} clicked tile number ${window.event.target.id}`)
                GameBoard.gameBoard.splice(window.event.target.id, 1, player1.getSymbol())
                console.log(GameBoard.gameBoard)
                window.event.target.innerHTML = GameBoard.gameBoard[window.event.target.id];
                player++
            } else if(player === 2){
                console.log(`${player2.getName()} clicked tile number ${window.event.target.id}`)
                GameBoard.gameBoard.splice(window.event.target.id, 1, player2.getSymbol())
                console.log(GameBoard.gameBoard)
                window.event.target.innerHTML = GameBoard.gameBoard[window.event.target.id];
                player--
            }
        })
    });

};

const Player = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    
    const greet = () =>{
        console.log(`Hello ${name}, today you are playing ${symbol}`)
    }

    return {greet, getName, getSymbol};
};

let you = Player('&#10005', 'You');
let yourFriend = Player('&#9675', 'Your Friend');

const Game = (() => {
    gameController(you, yourFriend);
    let round = 0;
    let player = 1;

return {};
    
})();




