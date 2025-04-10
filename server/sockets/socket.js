const MessageDB = require("../models/MessageDB");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 User connected:", socket.id);

        socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
            const savedMessage = await MessageDB.addMessage(senderId, receiverId, message);
            io.to(receiverId).emit("receiveMessage", savedMessage);
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });
};
