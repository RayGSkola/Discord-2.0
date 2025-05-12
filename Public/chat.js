const socket = io();

document.getElementById("sendButton").addEventListener("click", () => {
    const input = document.getElementById("chatMessage");
    const message = input.value.trim();
    if (message) {
        socket.emit("chatMessage", message);
        input.value = "";
    }
});

socket.on("chatMessage", (data) => {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.textContent = data;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
});
