import express from "express";
import { startServer } from "./connections/PostgreSQL/database";
import ticketRoutes from "./routes/ticketRoutes";

const app = express();

app.use(express.json());
app.use("/api/tickets", ticketRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await startServer();
});


// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`Backend server is running on port ${PORT}...`);
//   });
// }

export default app;
