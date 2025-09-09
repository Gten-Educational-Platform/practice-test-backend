const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// === Allowed student emails ===
// Replace these with your 50 real student emails
const allowedEmails = [
  "student1@example.com",
  "student2@example.com",
  "student3@example.com",
  "student4@example.com",
  "student5@example.com",
  "student6@example.com",
  "student7@example.com",
  "student8@example.com",
  "student9@example.com",
  "student10@example.com",
  "student11@example.com",
  "student12@example.com",
  "student13@example.com",
  "student14@example.com",
  "student15@example.com",
  "student16@example.com",
  "student17@example.com",
  "student18@example.com",
  "student19@example.com",
  "student20@example.com",
  "student21@example.com",
  "student22@example.com",
  "student23@example.com",
  "student24@example.com",
  "student25@example.com",
  "student26@example.com",
  "student27@example.com",
  "student28@example.com",
  "student29@example.com",
  "student30@example.com",
  "student31@example.com",
  "student32@example.com",
  "student33@example.com",
  "student34@example.com",
  "student35@example.com",
  "student36@example.com",
  "student37@example.com",
  "student38@example.com",
  "student39@example.com",
  "student40@example.com",
  "student41@example.com",
  "student42@example.com",
  "student43@example.com",
  "student44@example.com",
  "student45@example.com",
  "student46@example.com",
  "student47@example.com",
  "student48@example.com",
  "student49@example.com",
  "student50@example.com"
].map(email => email.toLowerCase()); // ensure lowercase

// Store active sessions
let activeSessions = {};

// === POST /login ===
app.post("/login", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const normalizedEmail = email.toLowerCase();

  // Check if email is allowed
  if (!allowedEmails.includes(normalizedEmail)) {
    return res.status(401).json({ error: "Email not allowed" });
  }

  const token = Math.random().toString(36).substring(2);
  activeSessions[normalizedEmail] = token;

  console.log(`✅ Login: ${normalizedEmail}, token=${token}`);
  res.json({ token });
});

// === POST /validate ===
app.post("/validate", (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.json({ valid: false });

  const normalizedEmail = email.toLowerCase();
  const valid = activeSessions[normalizedEmail] === token;

  res.json({ valid });
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
