const socket = io();

let currentReceiver = null; // Här sparas vännen som är aktiv i chatten
let senderUsername = "{{currentUsername}}";



document.getElementById("sendButton").addEventListener("click", () => {
  const input = document.getElementById("chatMessage");
  const message = input.value.trim();

  if (!message) {
    console.error("Meddelandet är tomt");
    return;
  }

  if (!senderUsername) {
    console.error("Saknar användarnamn för avsändare");
    return;
  }

  if (!currentReceiver) {
    alert("Välj en vän att chatta med!");
    return;
  }

  console.log("Skickar meddelande:", { Sender_Username: senderUsername, Receiver_Username: currentReceiver, Message: message });

  socket.emit("chatMessage", { Sender_Username: senderUsername, Receiver_Username: currentReceiver, Message: message });

  input.value = "";
});

socket.on("chatMessage", (data) => {
    const chatBox = document.getElementById("chat-box");
    const msgElement = document.createElement("div");
    msgElement.textContent = `${data.Sender_Username}: ${data.Message}`;
    chatBox.appendChild(msgElement);
});

//Skicka friendrequest

document.getElementById('sendFriendRequestBtn').addEventListener('click', async () => {
    const receiverUsername = document.getElementById('friendUsernameInput').value.trim();
    const messageElem = document.getElementById('friendRequestMessage');

    if (!receiverUsername) {
        messageElem.textContent = "Ange ett användarnamn!";
        messageElem.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('/api/friends/request', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender_username: senderUsername,
                receiver_username: receiverUsername
            })
        });

        if (response.ok) {
            window.location.href = "/ChatRoom";
            messageElem.textContent = "Vänförfrågan skickad!";
            messageElem.style.color = 'green';
        } else {
            const errorData = await response.json();
            messageElem.textContent = "Fel: " + (errorData.message || "Något gick fel");
            messageElem.style.color = 'red';
        }
    } catch (error) {
        messageElem.textContent = "Fel vid kommunikation med servern.";
        messageElem.style.color = 'red';
        console.error(error);
    }
});



// Begär historik när du öppnar en konversation med en vän
function loadChatHistory(friendUsername) {
    currentReceiver = friendUsername;
    console.log("🔄 Begär historik för:", friendUsername);
    socket.emit("loadHistory", friendUsername, (response) => {
        console.log("📥 Historiksvar:", response);
        if (response.error) {
            console.error("Fel vid hämtning:", response.error);
            return;
        }

        const messages = response.messages;

        // Visa meddelanden i chatten
        messages.forEach(msg => {
            displayMessage(msg.Sender_Username, msg.Message, msg.Time);
        });

    });
}

// Visa ett meddelande i chatten
function displayMessage(sender, message, timestamp) {
    const chatBox = document.getElementById("chat-box");

    const div = document.createElement("div");
    div.classList.add("message");

    div.innerHTML = `<strong>${sender}</strong>: ${message} <small>${timestamp}</small>`;
    chatBox.appendChild(div);
}
document.querySelectorAll(".friend").forEach(el => {
    el.addEventListener("click", () => {
        const friendUsername = el.dataset.username; // <li data-username="John">
        loadChatHistory(friendUsername);
    });
});

