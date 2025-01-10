import express from 'express';
import mongodbConnection from './db/db.js';
import dotenv from 'dotenv';

const app = express();
const port = 3000;

dotenv.config({
    path: './.env'
});

mongodbConnection().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
});


app.get('/',);
