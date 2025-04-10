const socket = io();


function sendChat() {
    const inputField = document.getElementById("chatInput");
    const message = inputField.value.trim();
    
    if (!message) return; 

    
    socket.emit("sendMessage", { senderId: userId, receiverId: friendId, message });

    
    displayMessage({ senderId: userId, message });

    inputField.value = ""; 
}


socket.on("receiveMessage", (data) => {
    displayMessage(data);
});


function displayMessage(data) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${data.senderId}:</strong> ${data.message}`;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
}
