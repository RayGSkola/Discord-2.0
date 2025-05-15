const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const MessageDB = require("../models/MessageDB");


router.get("/messages", authenticateToken, async (req, res) => { //Hämtar alla meddelanden från databasen, men bara om anvnändaren är inloggad
    try {
        const messages = await MessageDB.getAllMessages(); //Har inte gjort functionen getAllMessages än
        res.json(messages);
    } catch (error) {
        console.error("Fel vid hämtning av meddelanden:", error);
        res.status(500).json({ error: "Internt serverfel" });
    }
});

router.get("/chat", async (req, res) => {
    try {
        const friends = await DisplayFriends();
        res.render("chat", { friends });  // Skicka till Handlebars
    } catch (error) {
        res.status(500).send("Error loading friends");
    }
});

router.get('/chat', authenticateToken, (req, res) => {
  const currentUsername = req.user.Username; 
  res.render('chat', { currentUsername });
});


module.exports = router;  