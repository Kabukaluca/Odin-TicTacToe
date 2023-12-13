(function() {
    const player_x = "x"
    const player_o = "o"
    let currPlayer = player_x

    gameboard = {
        gameboard: ["", "", "", "", "", "", "", "", ""]
    };

    setField = function(field, currPlayer) {
        gameboard.gameboard[field] = currPlayer;
        console.log(gameboard);
        changePlayer();
        render();
    };

    changePlayer = function() {
        currPlayer = (currPlayer === player_x) ? player_o : player_x
        console.log(currPlayer);
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

