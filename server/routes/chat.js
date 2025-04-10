const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Chat route");
});

module.exports = router;  