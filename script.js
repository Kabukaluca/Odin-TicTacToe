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
            }),
            
            fields.forEach(field => {
                field.addEventListener("mouseenter", function() {
                   if (!this.id.includes("X") && !this.id.includes("O")) {
                        this.classList.add(`${player.currPlayer}-hover`);    
                   }
                }),

                field.addEventListener("mouseleave", function() {
                    this.classList.remove(`${player.currPlayer}-hover`);
                })
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
        gameboard: ["", "", "", "", "", "", "", "", ""],

        blur() {
            const gameContainer = document.querySelector(".game-container");
            return (
                gameContainer.classList.add("blur")
            )
        },

        removeBlur() {
            const gameContainer = document.querySelector(".game-container");
            return (
                gameContainer.classList.remove("blur")
            )
        }
    };

    // GAMELOGIC
    gameLogic = {
        setField(field) {
            const errorMsg = document.querySelector(".error-msg");
            let lastPlayer = (player.currPlayer === player.player_x) ? player.player_o : player.player_x;

            if(gameboard.gameboard[field] !== "") {
                return(
                    errorMsg.innerText = (`This field (${field + 1}) has already been selected by ${lastPlayer}`),
                    errorMsg.classList.add("active")
                    )
            } else {
                gameboard.gameboard[field] = player.currPlayer;
                return (
                    errorMsg.classList.remove("active"),
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
                    gameLogic.dialogOpen(),
                    outcomeMsg.innerText =`${player.currPlayer} Wins the Game`,
                    gameLogic.restart(),
                    player.switchPlayer()
                );
            } else if (draw) {
                return (
                    gameLogic.dialogOpen(),
                    outcomeMsg.innerText= "It's a Draw!",
                    gameLogic.restart(),
                    player.switchPlayer()
                );
            } else {
                return (
                    player.switchPlayer()
                );
            };
        },

        dialogOpen() {
            return (
                dialog.showModal(),
                dialog.classList.add("active"),
                gameboard.blur()
            );
        },

        dialogClose() {
            return(
                dialog.classList.remove("active"),
                    gameboard.removeBlur(),
                    dialog.close()
            );
        },

        restart() {
            fields = document.querySelectorAll("#O, #X");
            restartBtn = document.querySelector(".restart-btn");
            dialog = document.querySelector(".outcome-overlay");

            restartBtn.addEventListener("click", () => {
                return (
                    gameboard.gameboard = ["", "", "", "", "", "", "", "", ""],
    
                    fields.forEach(field => {
                        field.id = "",
                        field.classList.remove("O-hover"),
                        field.classList.remove("X-hover");
                    }),

                    gameLogic.dialogClose()
                );
            });     
        }
    };
})();