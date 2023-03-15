import express, { Express, Request, Response } from "express";
import cors from 'cors';
import { Pool } from 'pg';

const app: Express = express();
app.use(cors());

const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({result: 'success'});
});

app.listen(port);
