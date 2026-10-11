import express from "express";
import { startServer } from "./connections/PostgreSQL/database";
import ticketRoutes from "./routes/ticketRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/api/tickets", ticketRoutes);
app.use("/api/v1/users", userRoutes);

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
