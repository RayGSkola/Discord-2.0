
const {addMessage}= require("../models/MessageDB");

function setupSockets(io) {
    io.on("connection", (socket) => {
        console.log("🟢 New user connected:", socket.id);

        // Handle receiving a message from a client
    socket.on("chatMessage", async (data) => {
        console.log("Received data:", data); // Logga vad som tas emot

        const {Sender_Id, Receiver_Id, Message} = data;

        if (Sender_Id === undefined || Receiver_Id === undefined || Message === undefined) {
            console.error("Missing parameters:", data);
            return; // Returnera om något saknas
        }

        try {
            console.log(data);
            await addMessage(Sender_Id, Receiver_Id, Message);
            io.emit("chatMessage", data);
        } catch (error) {
            console.error("Fel vid sparning:", error);
        }
    });


    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});
}


module.exports = setupSockets
