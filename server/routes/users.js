const express = require("express");
const router = express.Router();
const UsersDB = require("../models/UsersDB");
const authenticateToken = require("../middleware/authMiddleware");

router.put("/user/:id", authenticateToken, async (req, res) => { //Uppdaterar användarens Displayname och Email om de är inloggad
    try {
        const { Displayname, Email } = req.body;
        const updated = await UsersDB.updateUser(req.params.id, Displayname, Email);
        if (!updated) return res.status(404).json({ error: "Användare hittades inte" });

        res.status(200).json({ message: "Användare uppdaterad", user: updated });
    } catch (error) {
        console.error("Fel vid uppdatering:", error);
        res.status(500).json({ error: "Internt serverfel" });
    }
});

module.exports = router;
