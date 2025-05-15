const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const FriendsDB = require("../models/FriendsDB");

// Skicka vänförfrågan - SKA använda authenticateToken för att hämta sender_Username från token, ej klienten!
router.post('/request', authenticateToken, async (req, res) => {
  console.log("authenticateToken kördes, req.user:", req.user);
  const sender_Username = req.user.username;
  const { receiver_username } = req.body;

  console.log("Skickar vänförfrågan:", { sender_Username, receiver_username });

  if (!receiver_username) {
    return res.status(400).json({ message: 'Saknar mottagare' });
  }

  if (!sender_Username) {
    return res.status(401).json({ message: 'Saknar giltig användare (token saknas eller är ogiltig)' });
  }

  try {
    // Kontrollera om de redan är vänner
    const existingFriends = await FriendsDB.getFriendsForUser(sender_Username);
    if (existingFriends.includes(receiver_username)) {
      return res.status(400).json({ message: 'Ni är redan vänner' });
    }

    // Kontrollera om det redan finns en pending förfrågan
    const pendingRequests = await FriendsDB.getPendingRequests(receiver_username);
    const alreadyPending = pendingRequests.some(r => r.sender_Username === sender_Username);
    if (alreadyPending) {
      return res.status(400).json({ message: 'Förfrågan redan skickad' });
    }

    await FriendsDB.sendFriendRequest(sender_Username, receiver_username);
    return res.status(200).json({ message: 'Vänförfrågan skickad!' });

  } catch (error) {
    console.error('DB error:', error);
    return res.status(500).json({ message: 'Fel vid hantering av vänförfrågan.' });
  }
});
 
router.get('/list/:username', async (req, res) => {
  try {
    const friends = await FriendsDB.getFriendsForUser(req.params.username);
    res.json(friends);
  } catch (err) {
    console.error("Fel vid hämtning av vänner:", err);
    res.status(500).json({ message: "Kunde inte hämta vänner" });
  }
});

// Hämta pending requests för användare
router.get("/pending/:username", async (req, res) => {
  try {
    const requests = await FriendsDB.getPendingRequests(req.params.username);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Acceptera vänförfrågan
router.post("/accept", async (req, res) => {
  const { sender_Username, receiver_username } = req.body;
  console.log("Mottagen acceptansförfrågan:", { sender_Username, receiver_username });

  if (!sender_Username || !receiver_username) {
    console.log("Saknar sender eller receiver");
    return res.status(400).json({ error: "Saknar sender eller receiver" });
  }

  try {
    await FriendsDB.acceptFriendRequest(sender_Username, receiver_username);
    console.log("Vänförfrågan accepterad i DB");
    res.json({ message: "Vänförfrågan accepterad" });
  } catch (err) {
    console.error("Fel vid acceptans:", err);
    res.status(500).json({ error: err.message || "Fel vid acceptans" });
  }
});



module.exports = router;
