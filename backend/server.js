import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// route modules
import categorizeRouter from "./routes/categorize.js";
import clarifyRouter from "./routes/clarify.js";
import motivateRouter from "./routes/motivate.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// use route modules
app.use("/api/categorize", categorizeRouter);
app.use("/api/clarify", clarifyRouter);
app.use("/api/motivate", motivateRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
