const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ADMIN = {
  username: "ritik",
  password: "admin@123"
};


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username || password !== ADMIN.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;