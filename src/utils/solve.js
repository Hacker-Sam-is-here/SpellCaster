class TrieNode {
    constructor() {
        this.letters = {};
        this.isWord = "";
    }

    addWord(word) {
        let cur = this;
        for (let letter of word) {
            if (!(letter in cur.letters)) {
                cur.letters[letter] = new TrieNode();
            }
            cur = cur.letters[letter];
        }
        cur.isWord = word;
    }
}

// Create a global Trie instance
const trie = new TrieNode();

const scores = {
    a: 1, b: 4, c: 5, d: 3, e: 1, f: 5, g: 3, h: 4,
    i: 1, j: 7, k: 6, l: 3, m: 4, n: 2, o: 1, p: 4,
    q: 8, r: 2, s: 2, t: 2, u: 4, v: 5, w: 5, x: 7,
    y: 4, z: 8
};

const n = 5;

export function addWordsToTrie(words) {
    words.forEach(word => {
        if (word.length > 1){
            trie.addWord(word);
        }
    });
}

export async function solve_board(board, doubleWord, doubleLetter, numSwaps) {
    const availableWords = new Set();
    const visited = new Set();
    let path = [];
    let swaplocations = [];
    const swapForWords = {};

    const trueScore = (letter, coordinate) => {
        if (coordinate[0] === doubleLetter[0] && coordinate[1] === doubleLetter[1]) {
            return scores[letter] * 2;
        }
        return scores[letter];
    };

    const dfs = (i, j, curTrie, score, changesRemaining) => {
        if (i < 0 || j < 0 || i >= n || j >= n) return;
        if (visited.has(`${i},${j}`)) return;

        const curLetter = board[i][j];

        if (!(curLetter in curTrie.letters) && changesRemaining <= 0) return;

        visited.add(`${i},${j}`);
        path.push([i, j]);

        const neighbours = [
            [i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1],
            [i + 1, j + 1], [i - 1, j - 1], [i + 1, j - 1], [i - 1, j + 1]
        ];

        for (let availableLetter in curTrie.letters) {
            if (availableLetter === curLetter) {
                const nextTrie = curTrie.letters[availableLetter];
                const letterScore = trueScore(availableLetter, [i, j]);

                if (nextTrie.isWord) {
                    let finalScore = score + letterScore;
                    let longWordBonus = 0;

                    if (visited.size >= 6) {
                        longWordBonus = 10;
                    }

                    const totalWordScore = (doubleWord.length > 0 && visited.has(`${doubleWord[0]},${doubleWord[1]}`))
                        ? [finalScore * 2 + longWordBonus, nextTrie.isWord]
                        : [finalScore + longWordBonus, nextTrie.isWord];

                    availableWords.add(JSON.stringify(totalWordScore));

                    swapForWords[JSON.stringify(totalWordScore)] = [JSON.parse(JSON.stringify(swaplocations)), JSON.parse(JSON.stringify(path))];
                }

                neighbours.forEach(([ni, nj]) => dfs(ni, nj, nextTrie, score + letterScore, changesRemaining));

            } else if (changesRemaining > 0) {
                const nextTrie = curTrie.letters[availableLetter];
                const letterScore = trueScore(availableLetter, [i, j]);
                swaplocations.push([[i, j], availableLetter]);

                if (nextTrie.isWord) {
                    let finalScore = score + letterScore;
                    let longWordBonus = 0;

                    if (visited.size >= 6) {
                        longWordBonus = 10;
                    }

                    const totalWordScore = (doubleWord.length > 0 && visited.has(`${doubleWord[0]},${doubleWord[1]}`))
                        ? [finalScore * 2 + longWordBonus, nextTrie.isWord]
                        : [finalScore + longWordBonus, nextTrie.isWord];

                    availableWords.add(JSON.stringify(totalWordScore));
                    swapForWords[JSON.stringify(totalWordScore)] = [JSON.parse(JSON.stringify(swaplocations)), JSON.parse(JSON.stringify(path))];
                }

                neighbours.forEach(([ni, nj]) => dfs(ni, nj, nextTrie, score + letterScore, changesRemaining - 1));

                swaplocations.pop();
            }
        }

        visited.delete(`${i},${j}`);
        path.pop();
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, trie, 0, numSwaps);
        }
    }

    const sortedAvailableWords = Array.from(availableWords).map(word => JSON.parse(word)).sort((a, b) => b[0] - a[0]);

    return {'res1' : sortedAvailableWords, 'res2' : swapForWords};
}