//&#10005 cross &#9675 circle

const GameBoard = (() => {
    let gameBoard =  ['', '', '' ,'', '', '', '', '', ''];

    const renderPlay = () => {
        let tiles = document.querySelectorAll('.tile');
        for(let i = 0; i<tiles.length; i++){
            tiles[i].innerHTML = gameBoard[i]
        };     
    };
    return {gameBoard,renderPlay};
})();

//win logic check if array spaces are 3 in a row, but only from round 5 


const Player = (symbol) => {
    const getSymbol = () => symbol;
     
    const playSquare = () => {
        let tiles = document.querySelectorAll('.tile')
        tiles.forEach(tile => {
            tile.addEventListener('click', (e) => {
                console.log(e.target.id)
                GameBoard.gameBoard.splice(e.target.id, 1, getSymbol());
                console.log(GameBoard.gameBoard);
                GameBoard.renderPlay();  
            });
        });
     };

    return {playSquare};
};

const Game = ((player1, player2) => {

    let round = 1;
    let player = 1;

    const playRound = () => {
        if(player === 1){
            round = round+1;
            player1.playSquare();
            player = 2;

        } else if (player === 2){
            round = round+1;
            player2.playSquare();
            player = 1;
        }
    };


return {playRound};
    
})(Player('X'), Player('0'));