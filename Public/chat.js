const socket = io();

// När användaren ansluter, ta emot senderId från servern
let senderId;

socket.on("userConnected", (data) => {
    senderId = data.senderId;  // Spara senderId som vi får från servern
    console.log("User connected with Sender Id:", senderId);  // Kontrollera att det är rätt ID
});

// Skicka ett meddelande
document.getElementById("sendButton").addEventListener("click", async () => {
    const input = document.getElementById("chatMessage");
    const message = input.value.trim();
    const receiverId = 2;  // Detta kan vara användarens vän eller en annan mottagare

    // Kontrollera att message och senderId är definierade innan meddelandet skickas
    if (message && senderId !== undefined) {
        console.log("Sending data:", { Sender_Id: senderId, Receiver_Id: receiverId, Message: message });
        socket.emit("chatMessage", { Sender_Id: senderId, Receiver_Id: receiverId, Message: message });
        input.value = "";  // Rensa inputfältet efter att ha skickat meddelandet
    } else {
        console.error("Sender ID is undefined or message is empty.");
    }
});

// Lyssna på nya meddelanden och visa dem i chatten
socket.on("chatMessage", (data) => {
    const chatBox = document.getElementById("chat-box");
    const msgElement = document.createElement("div");
    msgElement.textContent = `${data.Sender_Id}: ${data.Message}`;
    chatBox.appendChild(msgElement);
});
