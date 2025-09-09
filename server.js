const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Store active sessions
let activeSessions = {};

// === POST /login ===
app.post("/login", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const token = Math.random().toString(36).substring(2);
  activeSessions[email] = token;

  console.log(`✅ Login: ${email}, token=${token}`);
  res.json({ token });
});

// === POST /validate ===
app.post("/validate", (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.json({ valid: false });
  res.json({ valid: activeSessions[email] === token });
});

// ✅ Serve static frontend from Public folder
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
