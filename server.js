// ================================
// Practice Test Backend (Node.js)
// ================================
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Store active sessions in memory
let activeSessions = {};

// === POST /login ===
app.post("/login", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const token = Math.random().toString(36).substring(2);
  activeSessions[email] = token;

  console.log(`✅ Login: ${email}, token=${token}`);
  res.json({ token });
});

// === POST /validate ===
app.post("/validate", (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) {
    return res.json({ valid: false });
  }

  const valid = activeSessions[email] === token;
  res.json({ valid });
});

// ✅ Serve frontend (index.html + static files)
// Put all your frontend files inside /public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Render/Heroku/other platforms provide PORT in environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
