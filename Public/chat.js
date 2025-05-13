const socket = io();


// Send a message
document.getElementById("sendButton").addEventListener("click", async () => {
    const input = document.getElementById("chatMessage");
    const message = input.value.trim();
    const senderId = 1; // Detta bör vara den aktuella användarens ID
    const receiverId = 2; // Detta kan vara användarens vän eller mottagaren

    if (message) {
        console.log("Sending data:", {Sender_Id: senderId, Receiver_Id: receiverId, Message: message}); // Logga det som skickas
        socket.emit("chatMessage", {Sender_Id: senderId, Receiver_Id: receiverId, Message: message});
        input.value = "";
    }
});


// Listen for new messages
socket.on("chatMessage", (data) => {
    const chatBox = document.getElementById("chat-box");
    const msgElement = document.createElement("div");
    msgElement.textContent = `${data.Sender_Id}: ${data.Message}`;
    chatBox.appendChild(msgElement);
});
