const express = require("express");
const router = express.Router();

// Chatroom page
router.get("/", (req, res) => {
    res.render("Chat"); // Loads chat.handlebars
});

const socket = io();

// Send message
document.getElementById("sendButton").addEventListener("click", () => {
    const input = document.getElementById("chatMessage");
    const message = input.value.trim();
    if (message) {
        socket.emit("chatMessage", message);
        input.value = "";
    }
});

// Receive message
socket.on("chatMessage", async (data) => {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.textContent = data;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
});


module.exports = router;
