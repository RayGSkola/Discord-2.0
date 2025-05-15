const createPool = require("../config/db"); // Importera databaspoolen direkt om den exporterar pool

// Spara ett nytt meddelande
const addMessage = async (sender, receiver, message) => {
  const pool = await createPool();
  const now = new Date();  // Aktuellt datum och tid
  const sql = `
    INSERT INTO Messages (Sender_Username, Receiver_Username, Message, Time)
    VALUES (?, ?, ?, ?)
  `;

  await pool.query(sql, [sender, receiver, message, now]);
};

// Hämta alla meddelanden mellan två användare
async function getMessageHistory(userA, userB) {
    const pool = await createPool();

    const query = `
        SELECT Sender_Username, Receiver_Username, Message, Time
        FROM messages
        WHERE 
            (Sender_Username = ? AND Receiver_Username = ?) OR
            (Sender_Username = ? AND Receiver_Username = ?)
        ORDER BY Time ASC
    `;

    const [rows] = await pool.execute(query, [userA, userB, userB, userA]);
    return rows;
}



// Ta bort ett meddelande
const deleteMessage = async (Message_Id) => {
    const pool = await createPool();  // Anropa createPool för att skapa poolen
    const query = `DELETE FROM messages WHERE Message_Id = ?`;
    await pool.execute(query, [Message_Id]);
};


async function updateBanStatus(userId, banStatus) {
  const sql = "UPDATE users SET isBanned = ? WHERE id = ?";
  await db.execute(sql, [banStatus ? 1 : 0, userId]);
}


 async function getAllMessagesByUser(username) {
    const sql = `
      SELECT * FROM messages
      WHERE sender = ? OR receiver = ?
      ORDER BY timestamp ASC
    `;
    const [rows] = await db.execute(sql, [username, username]);
    return rows;
  }
module.exports = {
    addMessage,
    getMessageHistory,
    deleteMessage,
    updateBanStatus,
    getAllMessagesByUser
};
