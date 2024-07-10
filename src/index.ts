import express, { Application, Request, Response } from 'express';
import { configDotenv } from 'dotenv';
configDotenv()
import connect from './config/db';
import user_route from './routes/user.route';
import cookie_parser from 'cookie-parser';

// connect to database
connect()


const app: Application = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookie_parser());

app.use('/auth', user_route);

app.listen(port, () => { 
    console.log(`listening on port ${port}`)
});
