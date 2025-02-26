import { useState, useRef, useContext } from 'react';
import { Context } from '../store';
import { solve_board } from '../utils/solve';

const GameBoard = () => {
    const boardsize = 5;

    const [board, setBoard] = useState(Array(boardsize * boardsize).fill(''));
    const [swaps, setSwaps] = useState(0);
    const inputRefs = useRef([]);

    // DL tile selection
    const [selectedDLTile, setSelectedDLTile] = useState(-1);
    const [selectModeDL, setSelectModeDL] = useState(false);
    

    // results
    const { wordScores, wordDetails, trieBuilt, resultBoard } = useContext(Context);
    const [availableWords, setAvailableWords] = wordScores;
    const [swapForWords, setSwapForWords] = wordDetails;
    const [resBoard, setResBoard] = resultBoard;
    const [isPending, setIsPending] = useState(false);


    const handleDLButtonClick = () => {
        if (selectedDLTile !== -1) {
            setSelectedDLTile(-1);
        } else {
            setSelectModeDL((i) => !i); // Enter select mode
        }
    };

    const handleTileClick = (index) => {
        if (selectModeDL) {
            setSelectedDLTile(index); // Set the selected tile index
            setSelectModeDL(false); // Exit select mode
        } 
        if (selectMode2x) {
            setSelected2xTile(index); // Set the selected tile index
            setSelectMode2x(false); // Exit select mode
        }
    };

    // 2x tile selection
    const [selected2xTile, setSelected2xTile] = useState(-1);
    const [selectMode2x, setSelectMode2x] = useState(false);

    const handle2xButtonClick = () => {
        if (selected2xTile !== -1) {
            setSelected2xTile(-1);
        } else {
            setSelectMode2x((i) => !i); // Enter select mode
        }
    };


    const handleChange = (index, event) => {
        const newGrid = [...board];
        newGrid[index] = event.target.value.toUpperCase(); // Only accept uppercase letters
        
        if (event.target.value.length === 1) {
            const nextIndex = index + 1;
            if (nextIndex < board.length) {
                inputRefs.current[nextIndex]?.focus();
            }
        }
        
        setBoard(newGrid);
    };

    const handleClearBoard = () => {
        setBoard(Array(boardsize * boardsize).fill(''))
    }

    const handleSolve = async () => {
        // Convert grid to 5x5 character array
        if (!trieBuilt) {
            console.log('Tree is being build');
            return;
        }

        setIsPending(true);

        const charArray = [];
        for (let i = 0; i < boardsize; i++) {
            charArray.push(board.slice(i * boardsize, (i + 1) * boardsize));
        }

        for (let i = 0; i < boardsize; i++) {
            for (let j = 0; j < boardsize; j++) {
                charArray[i][j] = charArray[i][j].toLowerCase();
            }
        }
        let tile_2x = []
        if (selected2xTile !== -1) {
            tile_2x = [Math.floor(selected2xTile / boardsize), selected2xTile % boardsize]
        } 

        let tile_dl = []
        if (selectedDLTile  !== -1) {
            tile_dl = [Math.floor(selectedDLTile / boardsize), selectedDLTile % boardsize]
        }

        setResBoard({board : charArray, tile_2x : tile_2x, tile_dl : tile_dl});

        const result = await solve_board(charArray, tile_2x, tile_dl, swaps);

        console.log(result);

        if (result['res1'].length > 0) {
            setAvailableWords(result['res1']);
            setSwapForWords(result['res2']);
        }
        setIsPending(false);

        // You can also send charArray to some function or API here
    };

    return ( 
        <div className="gameboard mt-10">
            <div className="gameboard-outline flex flex-col p-5">
                <div className="gameboard-fill p-4 gameboard-letters">
                    <div className="gameboard-tile-grid">
                        {
                            board.map((cell, i) => (
                                <div className={`gameboard-tile-grid-item show-border flex justify-center items-center font-black text-2xl ${selectedDLTile === i ? 'selected-DL-tile' : ''} ${selected2xTile === i ? 'selected-2x-tile' : ''}`}
                                key={i}
                                onClick={() => handleTileClick(i)}
                                style={{ cursor: (selectModeDL || selectMode2x) ? 'pointer' : 'default' }} // Cursor style to indicate clickability
                                >
                                    <input 
                                        className="gameboard-tile-input"
                                        type="text"
                                        value={cell}
                                        onChange={(e) => handleChange(i, e)}
                                        maxLength={1}
                                        ref={el => inputRefs.current[i] = el}
                                        style={{ cursor: (selectModeDL || selectMode2x) ? 'pointer' : 'text' }

                                        } // Cursor style to indicate clickability
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="gameboard-fill-2 mt-3 p-4 gameboard-options flex justify-between">
                    <button 
                    className="DL-button gameboard-options-buttons font-bold text-xl"
                    onClick={handleDLButtonClick}
                    style={{backgroundColor: selectModeDL ? 'var(--color-tile-accent)' : 'var(--color-white-1)'}}
                    >
                        
                        DL
                    </button>

                    <button 
                    className="2x-button gameboard-options-buttons font-bold text-xl"
                    onClick={handle2xButtonClick}
                    style={{backgroundColor: selectMode2x ? 'var(--color-tile-accent)' : 'var(--color-white-1)'}}
                    >     
                        2X
                    </button>
                    <div className="numswaps-button show-border flex justify-around items-center font-bold text-xl">
                        <div>
                            Swaps:
                        </div>
                        <input 
                        type="number"
                        min="0" max="3"
                        value={swaps}
                        onChange={(e) => setSwaps(e.target.value)}
                        >
                        
                        </input>
                    </div>
                    <button 
                        className="clear-board-button gameboard-options-buttons font-bold text-xl"
                        onClick={handleClearBoard}
                        >
                        X
                    </button>
                </div>
                    <button 
                    className="gameboard-run-button font-bold text-xl"
                    onClick={handleSolve}
                    disabled={isPending}
                    >
                        {!isPending ? "START SOLVE" : "Working"}
                    </button>
            </div>
        </div>
     );
}
 
export default GameBoard;
