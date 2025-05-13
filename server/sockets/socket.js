const jwt = require("jsonwebtoken");
const { addMessage } = require("../models/MessageDB");
const cookie = require("cookie");
const SECRET_KEY = "!wolley dna kcalb ,hoO kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY elbissopmi si kniht snamuh tahw erac tnod seeb esuaceb yawyna seilf ,esruoc fo ,eeb ehT dnuorg eht ffo ydob elttil taf sti teg ot llams oot era sgniw stI ylf ot elba eb dluohs eeb a yaw on si ereht ,noitaiva fo swal nwonk lla ot gnidroccA";

function setupSockets(io) {
    io.on("connection", (socket) => {
        console.log("🟢 New user connected:", socket.id);
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const token = cookies.authToken;

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                console.log("❌ Ogiltig token.");
                socket.disconnect();
                return;
            }
            socket.user = user;
            console.log("🟢 Användare ansluten:", user.username);

            // Skicka senderId till frontend när användaren ansluter
            socket.emit("userConnected", { senderId: user.username });

            socket.on("chatMessage", async (data) => {
                console.log("Received data:", data); // Logga vad som tas emot

                const { Receiver_Id, Message } = data;

                if (Receiver_Id === undefined || Message === undefined) {
                    console.error("Missing parameters:", data);
                    return; // Returnera om något saknas
                }

                try {
                    const senderId = user.username;  // Använd user.username här
                    console.log(data);
                    await addMessage(senderId, Receiver_Id, Message);
                    io.emit("chatMessage", data);  // Skicka meddelandet till alla anslutna användare
                } catch (error) {
                    console.error("Fel vid sparning:", error);
                }
            });
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });
}

module.exports = setupSockets;
