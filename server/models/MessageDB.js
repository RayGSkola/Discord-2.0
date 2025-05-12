const db = require("../config/db");


const MessageDB = {
    addMessage: async (senderId, receiverId, message) => {
        const query = "INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())";
        const [result] = await db.execute(query, [senderId, receiverId, message]);
        return {
            id: result.insertId,
            senderId,
            receiverId,
            message,
            timestamp: new Date()
        };
    }
};


module.exports = MessageDB;
