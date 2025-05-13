const createPool = require("../config/db"); // Importera databaspoolen direkt om den exporterar pool

// Spara ett nytt meddelande
const addMessage = async (Sender_Id, Receiver_Id, Message) => {
    // Kontrollera om någon parameter är undefined
    if (Sender_Id === undefined || Receiver_Id === undefined || Message === undefined) {
        throw new Error("Sender_Id, Receiver_Id, and Message must be defined.");
    }

    const pool = await createPool();  // Anropa createPool för att skapa poolen

    // Sätt defaultvärde till null om message är undefined
    if (Message === undefined) {
        Message = null;
    }

    const query = `INSERT INTO messages (Sender_Id, Receiver_Id, Message, Time) VALUES (?, ?, ?, NOW())`;
    await pool.execute(query, [Sender_Id, Receiver_Id, Message]);
};

// Hämta alla meddelanden mellan två användare
const getMessagesBetweenUsers = async (userA, userB) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `
        SELECT * FROM messages
        WHERE (Sender_Id = ? AND Receiver_Id = ?)
           OR (Sender_Id = ? AND Receiver_Id = ?)
        ORDER BY Time ASC
    `;
    const [rows] = await pool.execute(query, [userA, userB, userB, userA]);
    return rows;
};

// Hämta ett meddelande baserat på meddelandets ID
const getMessageById = async (Message_Id) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `SELECT * FROM messages WHERE Message_Id = ?`;
    const [row] = await pool.execute(query, [Message_Id]);
    return row;
};

// Uppdatera ett meddelande (exempel: ändra innehåll eller tid)
const updateMessage = async (Message_Id, newMessage) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `UPDATE messages SET Message = ? WHERE Message_Id = ?`;
    await pool.execute(query, [newMessage, Message_Id]);
};

// Ta bort ett meddelande
const deleteMessage = async (Message_Id) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `DELETE FROM messages WHERE Message_Id = ?`;
    await pool.execute(query, [Message_Id]);
};

// Hämta alla meddelanden skickade av en specifik användare
const getMessagesFromUser = async (Sender_Id) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `SELECT * FROM messages WHERE Sender_Id = ? ORDER BY Time ASC`;
    const [rows] = await pool.execute(query, [Sender_Id]);
    return rows;
};

// Hämta alla meddelanden mottagna av en specifik användare
const getMessagesForUser = async (Receiver_Id) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `SELECT * FROM messages WHERE Receiver_Id = ? ORDER BY Time ASC`;
    const [rows] = await pool.execute(query, [Receiver_Id]);
    return rows;
};

// Hämta alla meddelanden i systemet (kan användas för admin-verktyg eller liknande)
const getAllMessages = async () => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `SELECT * FROM messages ORDER BY Time ASC`;
    const [rows] = await pool.execute(query);
    return rows;
};

module.exports = {
    addMessage,
    getMessagesBetweenUsers,
    getMessageById,
    updateMessage,
    deleteMessage,
    getMessagesFromUser,
    getMessagesForUser,
    getAllMessages
};
