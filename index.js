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

    return {getSymbol, playSquare};
};