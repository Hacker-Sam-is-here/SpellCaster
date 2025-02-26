import React, { useState, useEffect } from 'react';
import { addWordsToTrie } from './utils/solve';
import dictionaryUrl from '../public/assets/dictionary.txt?url';

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
                console.log('Fetching dictionary from:', dictionaryUrl);
                const response = await fetch(dictionaryUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                if (!text) {
                    throw new Error('Dictionary file is empty');
                }
                console.log('Dictionary loaded, processing words...');
                const words = text.split('\n').map(word => word.trim()).filter(word => word);
                console.log(`Found ${words.length} words`);
                addWordsToTrie(words);
                console.log('Trie built successfully');
                setTrieBuilt(true);
            } catch (error) {
                console.error('Error building trie:', error);
                alert('Failed to load dictionary. Please check console for details.');
            }
        };

        buildTrie();
    }, []);

    return (
        <Context.Provider value={{
            wordScores: [availableWords, setAvailableWords], 
            wordDetails: [swapForWords, setSwapForWords],
            trieBuilt,
            resultBoard: [resBoard, setResBoard]
        }}>
            {children}
        </Context.Provider>
    );
};

export default Store;
