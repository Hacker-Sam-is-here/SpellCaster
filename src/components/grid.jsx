import React from 'react';

const Grid = ({ board, path, tile_2x, tile_dl, swaps}) => {
    const cellSize = 65; // Adjust according to your cell size

    const lines = path.slice(1).map(([i, j], index) => {
        const [prevI, prevJ] = path[index];
        const x1 = prevJ * cellSize + cellSize / 2;
        const y1 = prevI * cellSize + cellSize / 2;
        const x2 = j * cellSize + cellSize / 2;
        const y2 = i * cellSize + cellSize / 2;

        return (
            <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="red"
                strokeWidth="3"
            />
        );
    });

    const swapset = new Set();
    const newboard = structuredClone(board);
    for (let i = 0; i < swaps.length; i++) {
        newboard[swaps[i][0][0]][swaps[i][0][1]] = swaps[i][1];
        swapset.add(`${swaps[i][0][0]},${swaps[i][0][1]}`);
    }

    return (
        <div className="grid-container">
            <svg
                className="grid-svg"
                width={newboard[0].length * cellSize}
                height={newboard.length * cellSize}
                style={{ position: 'absolute', top: 0, left: 0 }}
            >
                {lines}
            </svg>
            {newboard.map((row, i) => (
                <div className="grid-row" key={i}>
                    {row.map((cell, j) => (
                        <div
                            key={j}
                            className={`grid-cell text-4xl font-bold ${swapset.has(`${i},${j}`) ? 'res-grid-swaps' : 0}
                             ${(path[0][0] === i && path[0][1] === j) ? 'res-grid-start' : ''}
                             ${(tile_2x[0] === i && tile_2x[1] === j) ? 'res-grid-2x' : ''}
                             ${(tile_dl[0] === i && tile_dl[1] === j) ? 'res-grid-dl' : ''}
                             `}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
