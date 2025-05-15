const jwt = require("jsonwebtoken");
const { addMessage, getMessageHistory } = require("../models/MessageDB");
const cookie = require("cookie");
const UsersDB = require("../models/UsersDB");

const SECRET_KEY = "!wolley dna kcalb ,hoO kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY elbissopmi si kniht snamuh tahw erac tnod seeb esuaceb yawyna seilf ,esruoc fo ,eeb ehT dnuorg eht ffo ydob elttil taf sti teg ot llams oot era sgniw stI ylf ot elba eb dluohs eeb a yaw on si ereht ,noitaiva fo swal nwonk lla ot gnidroccA";

const onlineUsers = {};

function setupSockets(io) {
    io.on("connection", (socket) => {
        console.log("🟢 Ny användare ansluten:", socket.id);

        // Läs JWT-token från cookies
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const token = cookies.authToken;

       jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) {
        console.log("❌ Ogiltig token.");
        socket.disconnect();
        return;
    }
    // använd rätt fält
    const username = user.username;

    socket.user = user;
    onlineUsers[username] = socket.id;
    
    socket.emit("userConnected", { senderId: username });

    // resten av din kod...

            // Ladda meddelandehistorik
            socket.on("loadHistory", async (friendUsername, callback) => {
                try {
                    if (!friendUsername) {
                        return callback({ error: "friendUsername saknas" });
                    }
                    const messages = await getMessageHistory(username, friendUsername);
                    callback({ messages });
                } catch (error) {
                    console.error("❌ Fel vid hämtning av historik:", error);
                    callback({ error: "Kunde inte hämta historiken." });
                }
            });

            // Hantera inkommande meddelanden & admin-kommandon
            socket.on("chatMessage", async (data) => {
                const { Receiver_Username, Message } = data;

                if (!Receiver_Username || !Message) {
                    console.error("⚠️ Saknade fält:", data);
                    return;
                }

                try {
                    // Kontrollera banstatus i DB varje gång
                    const userFromDB = await UsersDB.getUserByUsername(username);
                    if (!userFromDB) {
                        socket.emit("systemMessage", "Användaren finns inte.");
                        socket.disconnect();
                        return;
                    }
                    if (userFromDB.isBanned) {
                        socket.emit("systemMessage", "Du är bannad och kan inte skicka meddelanden.");
                        return;
                    }

                    // Admin-kommandon (endast admin kan använda)
                    if (Message.startsWith("/ban ")) {
                        if (!userFromDB.isAdmin) {
                            socket.emit("systemMessage", "Du har inte rättighet att använda detta kommando.");
                            return;
                        }

                        const userToBan = Message.split(" ")[1];
                        if (!userToBan) {
                            socket.emit("systemMessage", "Ange användarnamn att banna.");
                            return;
                        }

                        const success = await UsersDB.banUser(userToBan);
                        if (!success) {
                            socket.emit("systemMessage", "Användaren finns inte.");
                            return;
                        }

                        io.emit("systemMessage", `${userToBan} har blivit bannad av en admin.`);

                        // Koppla från användaren som blev bannad om online
                        const bannedSocketId = onlineUsers[userToBan];
                        if (bannedSocketId) {
                            io.to(bannedSocketId).emit("systemMessage", "Du har blivit bannad och kopplas från.");
                            io.sockets.sockets.get(bannedSocketId)?.disconnect(true);
                        }
                        return; // Avsluta efter admin-kommandot
                    }

                    // Vanlig meddelandehantering
                    await addMessage(username, Receiver_Username, Message);

                    // Skicka tillbaka till sändaren
                    socket.emit("chatMessage", {
                        Sender_Username: username,
                        Receiver_Username,
                        Message
                    });

                    // Skicka till mottagaren om denne är online
                    const receiverSocketId = onlineUsers[Receiver_Username];
                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit("chatMessage", {
                            Sender_Username: username,
                            Receiver_Username,
                            Message
                        });
                    }
                } catch (error) {
                    console.error("❌ Fel vid meddelandehantering:", error);
                    socket.emit("systemMessage", "Ett fel uppstod vid meddelandehantering.");
                }
            });

            // Hantera frånkoppling
            socket.on("disconnect", () => {
                console.log("🔴 Användare frånkopplad:", socket.id);
                delete onlineUsers[username];
            });
        });
    });
}

module.exports = setupSockets;
