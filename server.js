const express = require("express");

const app = express();
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BMS Telemetry Server is running",
  });
});

app.post("/api/v1/bms/telemetry", (req, res) => {
  console.log("\n========== BMS TELEMETRY ==========");
  console.log("Time:", new Date().toISOString());
  console.log(JSON.stringify(req.body, null, 2));
  console.log("===================================\n");

  res.status(200).json({
    success: true,
    message: "Telemetry received",
  });
});

app.post("/api/v1/bms/telemetry/summary", (req, res) => {
  console.log("\n======= BMS TELEMETRY SUMMARY =======");
  console.log("Time:", new Date().toISOString());
  console.log(JSON.stringify(req.body, null, 2));
  console.log("=====================================\n");

  res.status(200).json({
    success: true,
    message: "Summary received",
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON",
    });
  }

  console.error(err);
  res.status(500).json({ success: false });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`BMS server running on port ${PORT}`);
});