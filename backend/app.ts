import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}...`);
  });
}

export default app;
