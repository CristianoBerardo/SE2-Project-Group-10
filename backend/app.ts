import express from "express";
import { startServer } from "./connections/PostgreSQL/database";

const app = express();

const port = process.env.PORT || 3000;

app.listen(async () => {
  console.log(`Serveraksbcciadvbuds is running on http://localhost:${port}`);
  await startServer();
});

export default app;
