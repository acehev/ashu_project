const jobRoutes = require("./routes/jobRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const dns = require('dns');
const applicationRoutes = require("./routes/applicationRoutes");
dns.setServers(['1.1.1.1', '8.8.8.8']);


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Job Portal Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});