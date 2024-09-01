const express = require("express");
const router = express.Router();

// Authentication routes would go here

router.post("/login", (req, res) => {
  res.status(201).send("OK");
});

router.post("/signup", (req, res) => {});

module.exports = router;
