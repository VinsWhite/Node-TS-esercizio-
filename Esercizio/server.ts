import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import operations from './index';

// con dotenv "preleviamo" le informazioni dal file config.env
dotenv.config({ path: './config.env' });

// utilizziamo il framework express
const app: Express = express();

// pagina di get
app.get("/", async (req: Request, res: Response) => {
    try {
        // in attesa che i dati vengano letti dalla funzione operations che legge i dati da un file
        const fileContent = await operations();
        res.send(fileContent);
    } catch (err) { // gestione errore 
        res.sendStatus(500).send("Error reading file");
    }
});

// inizializziamo la variabile seguendo la porta dichiarata in config.env oppure la 3000 in caso di qualche strano problema
const port = process.env.PORT || 3000;

// app listener per avviare il server alla porta...
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
