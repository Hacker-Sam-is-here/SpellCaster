import { useState, useRef, useContext } from 'react';
import { Context } from '../store';
import ResultCard from './resultcard';

const BoardResults = () => {
    const { wordScores, wordDetails, trieBuilt, resultBoard } = useContext(Context);
    const [availableWords, setAvailableWords] = wordScores;
    const [swapForWords, setSwapForWords] = wordDetails;
    const [resBoard, setResBoard] = resultBoard;

    const topn = 5;
    const topwords = [];

    for (let i = 0; i < Math.min(topn, availableWords.length); i++) {
        topwords.push(availableWords[i]);
    }
    console.log(availableWords)
    console.log(swapForWords)

    return ( 
        <div className="boardresults mt-20 flex flex-col gap-10">
            {availableWords.length > 0 && Object.keys(swapForWords).length !== 0 &&
                topwords.map((word, i) => (
                    <ResultCard wordScores={word} wordDetails={swapForWords[JSON.stringify(word)]} board={resBoard} key={i}/>
                ))
            }
        </div>
     );
}
 
export default BoardResults;