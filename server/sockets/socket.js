
// server/sockets/socket.js
function setupSockets(io) {
    io.on("connection", (socket) => {
        console.log("🟢 New user connected:", socket.id);

        // Handle receiving a message from a client
        socket.on("chatMessage", (data) => {
            console.log("📩 Message received:", data);

            // Send the message to everyone (including sender)
            io.emit("chatMessage", data);
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });
}


module.exports = setupSockets
