const createPool = require("../config/db")

async function getFriendsForUser(username) {
  const pool = await createPool();
  const query = `
    SELECT 
      CASE 
        WHEN user1_Username = ? THEN user2_Username 
        ELSE user1_Username 
      END AS friend
    FROM friends
    WHERE (user1_Username = ? OR user2_Username = ?)
  `;
  const [results] = await pool.query(query, [username, username, username]);
  return results.map(row => row.friend);
}


async function sendFriendRequest(sender_Username, receiver_Username) {
  const pool = await createPool();
  try {
    // Kontroll: är de redan vänner?
    const [existingFriend] = await pool.query(`
      SELECT * FROM friends
      WHERE (user1_Username = ? AND user2_Username = ?)
         OR (user1_Username = ? AND user2_Username = ?)`,
      [sender_Username, receiver_Username, receiver_Username, sender_Username]
    );

    if (existingFriend.length > 0) {
      throw new Error("Ni är redan vänner");
    }

    // Kontroll: finns redan en väntande förfrågan?
  // Kontrollera om det finns en väntande eller skickad vänförfrågan, oavsett riktning
const [existingRequest] = await pool.query(`
  SELECT * FROM friend_requests
  WHERE 
    (sender_Username = ? AND receiver_Username = ? AND status = 'pending')
    OR
    (sender_Username = ? AND receiver_Username = ? AND status = 'pending')`,
  [sender_Username, receiver_Username, receiver_Username, sender_Username]
);

if (existingRequest.length > 0) {
  throw new Error("En vänförfrågan är redan skickad mellan er.");
}


    if (existingRequest.length > 0) {
      throw new Error("Det finns redan en vänförfrågan mellan er");
    }

    // Annars – skicka ny
    const sql = `
      INSERT INTO friend_requests (sender_Username, receiver_Username, status)
      VALUES (?, ?, 'pending')
    `;
    console.log("Skickar vänförfrågan:", { sender_Username, receiver_Username });
    await pool.execute(sql, [sender_Username, receiver_Username]);
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    throw error;
  }
}

async function getPendingRequests(receiver) {
     const pool = await createPool();
  const [rows] = await pool.query(
    `SELECT sender_Username FROM friend_requests WHERE receiver_Username = ? AND status = 'pending'`,
    [receiver]
  );
  return rows;
}

async function acceptFriendRequest(sender, receiver) {
  const pool = await createPool();

  // Starta transaktion
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Uppdatera vänförfrågan till 'accepted'
    const [result] = await conn.execute(
      `UPDATE friend_requests
       SET status = 'accepted'
       WHERE sender_Username = ? AND receiver_Username = ? AND status = 'pending'`,
      [sender, receiver]
    );

    if (result.affectedRows === 0) {
      throw new Error("Ingen väntande vänförfrågan att acceptera");
    }

    // Lägg till vänskapsrelation i 'friends' tabellen (två rader för båda håll)
    await conn.execute(
      `INSERT INTO friends (user1_Username, user2_Username) VALUES (?, ?)`,
      [sender, receiver]
    );


    // Commit
    await conn.commit();
  } catch (error) {
    // Rollback vid fel
    await conn.rollback();
    console.error(error);
    throw error;
  } finally {
    conn.release();
  }
}


module.exports = {
  getFriendsForUser,
  sendFriendRequest,
  getPendingRequests,
  acceptFriendRequest
};
