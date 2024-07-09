import express, { Application, Request, Response } from 'express';
import { configDotenv } from 'dotenv';
configDotenv()
import connect from './config/db';

// connect to database
connect()


const app: Application = express();

const port = process.env.PORT || 3000;

app.listen(port, () => { 
    console.log('listening on port')
});
