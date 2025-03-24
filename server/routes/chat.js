const express = require("express");
const router = express.Router();

// Chat-related routes here
router.get("/", (req, res) => {
    res.send("Chat route");
});

module.exports = router;  // Export router here
