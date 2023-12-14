(function() {
    const player_x = "x"
    const player_o = "o"
    let currPlayer = player_x

    gameboard = {
        gameboard: ["", "", "", "", "", "", "", "", ""]
    };

    setField = function(field) {
        console.log(currPlayer);
        gameboard.gameboard[field] = currPlayer;
        console.log(gameboard);
        checkWin();
        console.log("checking for Win");
    };

    changePlayer = function() {
        currPlayer = (currPlayer === player_x) ? player_o : player_x
        console.log(`Player has been changed to ${currPlayer}`);
    };

    checkWin = function() {
        winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

     

        win = winningCombinations.some(combination => {
            return combination.every(index => gameboard.gameboard[index] === currPlayer)
        });
        draw = [0, 1, 2, 3, 4, 5, 6, 7, 8].every(index => gameboard.gameboard[index] !== "")

        if (win) {
            console.log(`${currPlayer} Won the Game!`);
            restart();
        } else if (draw) {
            console.log("It's a draw!")
            restart();
        } else {
            changePlayer();
            return;
        };
    };

    restart = function() {
        gameboard.gameboard = ["", "", "", "", "", "", "", "", ""];
    };

})();


/* GET FIELDS ON CLICK
const fields = document.querySelectorAll(".field");
fields.forEach(field => {
    field.addEventListener("click", function() {
        let dataIndex = parseInt(this.getAttribute("data-index"));
        console.log(dataIndex);
        player = "X"
        setField(dataIndex, player)
    })
})
*/

