import FileReader from './FileReader';

// interfaccia per contare le parole 
interface WordCount {
    [key: string]: number; // chiave di tipo stringa 
}

async function operations(): Promise<any> {
    try {
        const fileReader = FileReader.getInstance();
        const data = await fileReader.readFile(`${__dirname}/file/file.txt`);

        // numero di parole
        const arrayWords = data.match(/\b(\w+)\b/g);
        console.log(`Number of words: ${arrayWords?.length}`);

        // numero di lettere (esclusi gli spazi)
        const countLetters = data.replace(/\s/g, '');
        console.log(`Number of characters: ${countLetters.length}`);

        // numero di spazi
        const countSpaces = data.match(/\s/g)?.length || 0;
        console.log(`Number of spaces: ${countSpaces}`);

        // frequenza parole
        const wordFrequency: WordCount = {};
        arrayWords?.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        // parole che appaiono più di 10 volte
        const frequentWords = Object.entries(wordFrequency)
            .filter(([word, count]) => count > 10)
            .map(([word, count]) => ({ word, count }));

        console.log('Words that appear more than 10 times:', frequentWords);

        return {
            numberOfWords: arrayWords?.length || 0,
            numberOfCharacters: countLetters.length,
            numberOfSpaces: countSpaces,
            frequentWords
        };
    } catch (err) {
        throw err;
    }
}

export default operations;
