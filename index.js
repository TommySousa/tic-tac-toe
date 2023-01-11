const GameBoard = (() => {
    let gameBoard =  ['&#10005', '&#10005', '&#9675' ,'&#9675', '&#10005', '&#9675', '&#9675', '&#10005', '&#9675'];

    const placePlay = () => {
        let tiles = document.querySelectorAll('.tile');
        for(let i = 0; i<tiles.length; i++){
            tiles[i].innerHTML = gameBoard[i]
        };     
    };
    return {placePlay};
})();

//win logic check if array spaces are 3 in a row, but only from round 5 


const Player = (symbol) => {
    
}