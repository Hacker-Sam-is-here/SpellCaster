import React, { useState, useEffect } from 'react';
import { addWordsToTrie } from './utils/solve';

export const Context = React.createContext();

const Store = ({ children }) => {
    const [availableWords, setAvailableWords] = useState([]);
    const [swapForWords, setSwapForWords] = useState({});
    const [trieBuilt, setTrieBuilt] = useState(false);
    const [resBoard, setResBoard] = useState({});

    useEffect(() => {
        // Function to read the dictionary file and add words to the Trie
        const buildTrie = async () => {
            try {
                const response = await fetch('/spellcast_solver/assets/dictionary.txt'); // Adjust the path to your dictionary file
                const text = await response.text();
                const words = text.split('\n').map(word => word.trim());
                addWordsToTrie(words);
                setTrieBuilt(true);
            } catch (error) {
                console.error('Error reading dictionary file:', error);
            }
        };

        buildTrie();
    }, []);

    return (
        <Context.Provider value={{wordScores: [availableWords, setAvailableWords], 
            wordDetails: [swapForWords, setSwapForWords],
            trieBuilt,
            resultBoard : [resBoard, setResBoard]}}>
                {children}
        </Context.Provider>
    )
};

export default Store;