import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pool, QueryResult } from "pg";
console.log(process.env);
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT || "3001", 10);

app.get("/", (req: Request, res: Response) => {
  const pool = openDb();

  pool.query("select * from task", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    }
    res.status(200).json(result.rows);
  });
});

const openDb = (): Pool => {
  const pool: Pool = new Pool({
//    user: "postgres",
//    host: "localhost",
//    database: "todo",
//    password: "postgrespw",
//    port: 5432,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "", 10),
    ssl: true
  });
  return pool;
};

app.post("/new", (req: Request, res: Response) => {
  const pool = openDb();

  pool.query(
    "insert into task (description) values($1) returning *",
    [req.body.description],
    (error: Error, result: QueryResult) => {
      if (error) {
        res.status(500).json({ error: error.message });
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
  const pool = openDb();

  const id = parseInt(req.params.id, 10);
  pool.query(
    "delete from task where id = $1",
    [id],
    (error: Error, result: QueryResult) => {
      if (error) {
        res.status(500).json({ error: error.message });
      }
      res.status(200).json({ id: id });
    }
  );
});

app.listen(port);
