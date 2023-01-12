//&#10005 cross &#9675 circle

const GameBoard = (() => {
    let gameBoard =  ['', '', '' ,'', '', '', '', '', ''];
    let tiles = document.querySelectorAll('.tile');
    let index =-1;

   
    const renderPlay = () => {
        for(let i = 0; i<tiles.length; i++){
            tiles[i].innerHTML = gameBoard[i];
        };     
    };

    const clickedSquare = () => {
        for (let i = 0; i<tiles.length; i++){
            tiles[i].addEventListener('click', () => {
                console.log(`You clicked tile number ${i}`)
                return i;
            })
        }
    };

    //  const findClicked = (e) => {
    //      let target = e.target;
    //      index = e.target.id;
    //      console.log(target);
    //      console.log(index)
    //      e.target.removeAttribute("onclick");
    //  };
    
    return {gameBoard,renderPlay, clickedSquare};
})();





const Player = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    const playSquare = () => {
        GameBoard.gameBoard.splice(GameBoard.index, 1, getSymbol())
        GameBoard.renderPlay();
        console.log(`${getName()} played `)
    }

    // const playSquare = () => {
    //     let tiles = document.querySelectorAll('.tile')
    //      tiles.forEach(tile => {
    //          tile.addEventListener('click', (e) => {
    //                  console.log(e.target.id)
    //                  GameBoard.gameBoard.splice(e.target.id, 1, getSymbol());
    //                  console.log(GameBoard.gameBoard)
    //                  GameBoard.renderPlay();
    //          }, {once:true});
    //  });
    // }; 


     
    // const playSquare = (index) => {
    //     if (index >=0){
    //         GameBoard.gameBoard.splice(index, 1, getSymbol());
    //         GameBoard.renderPlay();
    //     }
    //   };

    return {playSquare};
    
};

const Game = ((player1, player2) => {

    let round = 1;
    let player = 1;

    const playRound = () => {
        if(player === 1){
            player1.playSquare();
            player = 2;
            round = round+1;

        } else if (player === 2){
            player2.playSquare();
            player = 1;
            round = round+1;
        }
    };
    
    const checkWinner = () =>{
        let gameBoard = JSON.stringify(GameBoard.gameBoard);
        if(gameBoard === (JSON.stringify([ "&#10005", "&#10005", "&#10005", "", "", "", "", "", ""]) || JSON.stringify([ "", "", "", "&#10005", "&#10005", "&#10005", "", "", ""]) || JSON.stringify([ "", "", "", "", "", "", "&#10005", "&#10005", "&#10005"]) || JSON.stringify([ "&#10005", "", "", "&#10005", "", "", "&#10005", "", ""]) || JSON.stringify([ "", "&#10005", "", "", "&#10005", "", "", "&#10005", ""]) || JSON.stringify([ "", "", "&#10005", "", "", "&#10005", "", "", "&#10005"]) || JSON.stringify([ "&#10005", "", "", "", "&#10005", "", "", "", "&#10005"]) || JSON.stringify([ "", "", "&#10005", "", "&#10005", "", "&#10005", "", ""]))){
            console.log('You win!')
            return true
        }
        else if (gameBoard === (JSON.stringify([ "&#9675", "&#9675", "&#9675", "", "", "", "", "", ""]) || JSON.stringify([ "", "", "", "&#9675", "&#9675", "&#9675", "", "", ""]) || JSON.stringify([ "", "", "", "", "", "", "&#9675", "&#9675", "&#9675"]) || JSON.stringify([ "&#9675", "", "", "&#9675", "", "", "&#9675", "", ""]) || JSON.stringify([ "", "&#9675", "", "", "&#9675", "", "", "&#9675", ""]) || JSON.stringify([ "", "", "&#9675", "", "", "&#9675", "", "", "&#9675"]) || JSON.stringify([ "&#9675", "", "", "", "&#9675", "", "", "", "&#9675"]) || JSON.stringify([ "", "", "&#9675", "", "&#9675", "", "&#9675", "", ""]))){
            console.log('You loose')
            return true
        } else{
            console.log('False')
        }

    }

return {round, playRound, checkWinner};
    
})(Player('&#10005', 'You'), Player('&#9675', 'Your Friend'));

