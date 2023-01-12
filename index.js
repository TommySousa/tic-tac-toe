//&#10005 cross &#9675 circle

const GameBoard = (() => {
    let gameBoard =  ['', '', '' ,'', '', '', '', '', ''];


    return {gameBoard};
})();

const pVp = (player1, player2) => {
    let tiles = document.querySelectorAll('.tile');
    let player = 1;
    let round =1;

    const gameLogic = () => {
            if ((player === 1 && window.event.target.innerHTML === '') && !checkWin() && round<11){
                console.log(`${player1.getName()} clicked tile number ${window.event.target.id}`)
                GameBoard.gameBoard.splice(window.event.target.id, 1, player1.getSymbol())
                console.log(GameBoard.gameBoard)
                window.event.target.innerHTML = GameBoard.gameBoard[window.event.target.id];
                player++ 
                round ++
                checkWin()

    
            } else if((player === 2 && window.event.target.innerHTML === '') && !checkWin() && round<11){
                console.log(`${player2.getName()} clicked tile number ${window.event.target.id}`)
                GameBoard.gameBoard.splice(window.event.target.id, 1, player2.getSymbol())
                console.log(GameBoard.gameBoard)
                window.event.target.innerHTML = GameBoard.gameBoard[window.event.target.id];
                player-- 
                round ++
                checkWin()
            }
    };

    tiles.forEach(tile => {
        tile.addEventListener('click', gameLogic)});
    
    return {round}
};

const checkWin = () => {
    const winOption = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

        for (let i = 0; i <winOption.length; i++){
            if((GameBoard.gameBoard[winOption[i][0]] === GameBoard.gameBoard[winOption[i][1]]) && (GameBoard.gameBoard[winOption[i][0]] === GameBoard.gameBoard[winOption[i][2]]) && (GameBoard.gameBoard[winOption[i][0]] !== '')){
                console.log(`The winner is ${GameBoard.gameBoard[winOption[i][0]]}`)
                return true
            }
        }    
}

const Player = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    return {getName, getSymbol};
};

let you = Player('&#10005', 'You');
let yourFriend = Player('&#9675', 'Your Friend');

const Game = (() => {
   pVp(you, yourFriend) 

return {};

})();




