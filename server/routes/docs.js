// server/routes/docs.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h1> API-dokumentation</h1>
    <p>All data skickas/returneras i JSON-format om inte annat anges.</p>
    
    <h2> Auth Routes</h2>
    <ul>
      <li><strong>POST</strong> /login - Loggar in en användare, returnerar JWT vid lyckad inloggning.</li>
      <li><strong>POST</strong> /register - Skapar en ny användare med hashat lösenord.</li>
    </ul>

    <h2> Chat Routes</h2>
    <ul>
      <li><strong>GET</strong> /chat/messages - Hämtar alla meddelanden (kräver token)</li>
      <li><strong>POST</strong> /chat/send - Skickar nytt meddelande (kräver token)</li>
    </ul>

    <h2> Friends Routes</h2>
    <ul>
      <li><strong>GET</strong> /friends - Hämtar användarens vänner (kräver token)</li>
      <li><strong>POST</strong> /friends/add - Skicka vänförfrågan</li>
    </ul>

    <p style="margin-top:2rem;"> <strong>Routes markerade med "kräver token"</strong> måste anropas med en giltig JWT-token i Authorization-headern.</p>
  `);
});

module.exports = router;
