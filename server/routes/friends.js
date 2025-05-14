const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");  // Importera middleware
const { createPool } = require("../config/db");

router.post("/add", verifyToken, async (req, res) => {  // Använd middleware för att säkerställa att användaren är autentiserad
    const { username } = req.body;  // Användarnamnet från body
    const userId = req.user.id;  // Hämta användarens id från den dekodade token

    if (!username) {
        return res.status(400).json({ error: "Username is required" });  // Om inget användarnamn ges, returnera 400
    }

    console.log(`User ${userId} trying to add friend: ${username}`);

    try {
        const pool = await createPool();
        const [users] = await pool.execute("SELECT Id FROM users WHERE username = ?", [username]);

        if (users.length === 0) {
            console.error(`User not found: ${username}`);
            return res.status(404).json({ error: "User not found" });  // Om användaren inte finns
        }

        const friendId = users[0].Id;
        if (friendId === userId) {
            console.error("User tried to add themselves");
            return res.status(400).json({ error: "You can't add yourself" });  // Om användaren försöker lägga till sig själv
        }

        const [existing] = await pool.execute("SELECT * FROM friends WHERE user_id = ? AND friend_id = ?", [userId, friendId]);
        if (existing.length > 0) {
            console.error("Already friends with this user");
            return res.status(400).json({ error: "Already friends" });  // Om de redan är vänner
        }

        await pool.execute("INSERT INTO friends (user_id, friend_id) VALUES (?, ?)", [userId, friendId]);
        console.log("Friend added successfully");
        res.json({ message: "Friend added successfully" });  // Skicka ett meddelande om att vännen lagts till

    } catch (err) {
        console.error("Error adding friend:", err);
        res.status(500).json({ error: "Internal server error" });  // Serverfel
    }
});

module.exports = router;
