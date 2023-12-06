# Odin-TicTacToe
Create Tic Tac Toe browser game as part of The Odin Project.

I will use this file for brainstorming and to determin, how I will approach this project.


# Odin Tips
- Store "gameboard-Arr" inside "Gameboard-Obj";
- Store players as Objects
- An object to control the game itself


# Brainstorming
- create an IIFE that "starts" the game on load;

- create on object "Gameboard" that will store all the game info:
    => gameboard
        -> display current gameboard;
            > render();

    => players:
        -> player_X = [ * selcted fields * ];
        -> player_O = [ * selcted fields * ];

    => gameLogic:

# Game logic (inside gamboard obj)
    => checks current symbol (X / O), change after click:
        -> curSymbol = X ? O : X    (<-- does this make sense ?--/>)

    => add eventListener("click")
        -> setField();
        
    => setField:
        -> set chosen field with (X / O);
        -> push chosen field to player_X or player_O;
        -> render();

    => round counter:
        -> increment by 1 after a player choosing a field;

    => check for win / draw:
        -> win:
            > [{012}, {345}, {678}, {036}, {145}, {258}, {048}, {246}]
                - declare winner;
                - call reset();

        -> draw: 
            > round-counter == 9 && no win;
                - declare draw;
                - call reset();

    => reset
        -> reset player_X and player_O;
        -> reset gameboard;
        -> render();
                         


            
