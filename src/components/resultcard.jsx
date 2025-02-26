
import Grid from "./grid";


const ResultCard = ({wordScores, wordDetails, board}) => {
    const gameboard = board['board'];
    const tile_2x = board['tile_2x'];
    const tile_dl = board['tile_dl'];

    const path = wordDetails[1];
    const swaps = wordDetails[0];

    return ( 
        <div className="result-card p-5 flex justify-between">
            <div className="results-word-score flex flex-col justify-center items-center">
                <h2 className="result-word-points text-9xl font-black">
                    {wordScores[0]}
                </h2>
                <p className="result-word-points text-5xl">Points</p>
                <h3 className="mt-5 text-6xl font-bold">
                    {wordScores[1]}
                </h3>
                <p className="mt-6 text-3xl">{wordDetails[0].length} Swaps</p>
            </div>
            <div className="results-board flex justify-center items-center">
                <Grid board={gameboard} path={path} tile_2x={tile_2x} tile_dl={tile_dl} swaps={swaps}/>
            </div>
        </div>
     );
}
 
export default ResultCard;