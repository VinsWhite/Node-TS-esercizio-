import * as fs from 'fs';

// utilizziamo un singleton pattern che assicura che ci sia una sola istanza di una classe per tutta l'applicazione
// semplifichiamo anche l'accesso al filereader
class FileReader {
    private static instance: FileReader;
    private constructor() {}

    public static getInstance(): FileReader {
        if (!FileReader.instance) {
            FileReader.instance = new FileReader();
        }
        return FileReader.instance;
    }

    public readFile(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export default FileReader;
