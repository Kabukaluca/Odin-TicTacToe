(function() {
    // INIT
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
        player_x: "X",
        player_o: "O",
        currPlayer: "X",

        switchPlayer: function() {
            return (
                this.currPlayer = (this.currPlayer === this.player_x) ? this.player_o : this.player_x
            );
        },
    };

    // GAMEBOARD 
    gameboard = {
        gameboard: ["", "", "", "", "", "", "", "", ""]
    };

    // GAMELOGIC
    gameLogic = {
        setField(field) {
            if(gameboard.gameboard[field] !== "") {
                return(console.log(`This field (${field + 1}) has alread been set`))
            } else {
                gameboard.gameboard[field] = player.currPlayer;
                return (
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
            dialog = document.querySelector(`.outcome-overlay`);
            outcomeMsg = document.querySelector(".outcome-msg");

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
                    dialog.showModal(),
                    dialog.classList.add("active"),

                    outcomeMsg.innerText =`${player.currPlayer} Wins The Game`,
                    gameLogic.restart()
                );
            } else if (draw) {
                return (
                    dialog.showModal(),
                    dialog.classList.add("active"),
                
                    outcomeMsg.innerText= "It's a Draw!",
                    gameLogic.restart()
                );
            } else {
                return (
                    player.switchPlayer()
                );
            };
        },

        restart() {
            fields = document.querySelectorAll("#O, #X");
            restartBtn = document.querySelector(".restart-btn");
            dialog = document.querySelector(".outcome-overlay");

            restartBtn.addEventListener("click", () => {
                return (
                    gameboard.gameboard = ["", "", "", "", "", "", "", "", ""],
    
                    fields.forEach(field => {
                        field.id = "";
                    }),

                    dialog.classList.remove("active"),
                    dialog.close()
                );
            });     
        }
    };
})();