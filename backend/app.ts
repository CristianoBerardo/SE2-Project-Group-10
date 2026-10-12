import cors from "cors";
import express from "express";
import { startServer } from "./connections/PostgreSQL/database";
import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/api/tickets", ticketRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

//app.listen(PORT, async () => {
//  console.log(`Server is running on http://localhost:${PORT}`);
//  await startServer();
//});


if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`Backend server is running on port ${PORT}...`);
    await startServer();
  });
}

export default app;
