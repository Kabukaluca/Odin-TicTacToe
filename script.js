(function() {
    // EVENT-LISTENER
    (function() {
        const fields = document.querySelectorAll(".field");
        return (
            fields.forEach(field => {
                field.addEventListener("click", function() {
                    let dataIndex = parseInt(this.getAttribute("data-index"));
                    gameLogic.setField(dataIndex);
                });
            })
        )
    })();

    // PLAYER
    player = {
        player_x: "x",
        player_o: "o",
        currPlayer: "x",

        switchPlayer: function() {
            return (
                this.currPlayer = (this.currPlayer === this.player_x) ? this.player_o : this.player_x,
                console.log(`Player has been changed to ${this.currPlayer}`)
            );
        },
    };

    // GAMEBOARD 
    gameboard = {
        gameboard: ["", "", "", "", "", "", "", "", ""]
    };

    // GAME-LOGIC
    gameLogic = {
        setField(field) {
            if(gameboard.gameboard[field] !== "") {
                return(console.log(`This field (${field + 1}) has alread been set`))
            } else {
                gameboard.gameboard[field] = player.currPlayer;
                return (
                    console.log(`Current Player: ${player.currPlayer}`),
                    gameboard.gameboard[field] = player.currPlayer,
                    gameLogic.render(field),
                    gameLogic.checkWin()
                )
            }
        },

        render(field) {
            field = document.querySelector(`[data-index="${field}"]`);
            field.id = player.currPlayer;
        },

        checkWin() {
            winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
            ];

            win = winningCombinations.some(combination => {
                return combination.every(index => gameboard.gameboard[index] === player.currPlayer);
            });
            draw = [0, 1, 2, 3, 4, 5, 6, 7, 8].every(index => gameboard.gameboard[index] !== "");

            if (win) {
                return(
                    console.log(`${player.currPlayer} Won the Game!`),
                    gameLogic.restart()
                );
            } else if (draw) {
                return (
                    console.log("It's a draw!"),
                    gameLogic.restart()
                );
            } else {
                return (
                    player.switchPlayer()
                );
            };
        },

        restart() {
            fields = document.querySelectorAll("#o, #x");
            return (
                gameboard.gameboard = ["", "", "", "", "", "", "", "", ""],
                // FIX THIS !!
                fields.forEach(field => {
                    field.id = "";
                })
            )
        },
    };
})();