const createPool = require("../config/db");

async function getUsers() {
    const pool = await createPool();
    try {
        const [rows] = await pool.execute("SELECT * FROM users");
        return rows; //Skapar array rows och sparar allt som man får från "SELECT * FROM users" i den
    } catch (error) {
        console.error("Error in getUsers:", error)
        throw new Error("Database query failed");
    }
}

async function getUsersById(userId) {
    const pool = await createPool();
    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE Id = ?", [userId]);
        return rows[0]; //Returnerar ett user objekt
    } catch (error) {
        console.error("Error in getUsersById:", error)
        throw new Error("Database query failed");
    }
}
async function getUserByUsername(username) {
    const pool = await createPool();
    const [rows] = await pool.query("SELECT * FROM Users WHERE Username = ?", [username]);
    return rows[0];
}

async function addUser (Username, Displayname, Email, Password) {
    console.log("Inserting into Database", {
        Username, Displayname, Email, Password
    })
     const pool = await createPool();

    try {
        const [result] = await pool.execute(
            "INSERT INTO Users (Username, Displayname, Email, Password) VALUES (?, ?, ?, ?)",
            [Username, Displayname, Email, Password]
        );

        // Returnera resultatet, t.ex. insertId
        return result;
    } catch (error) {
        console.error("Database insertion error:", error);
        throw new Error("Error executing the database query");
    }
}

async function banUser(username) {
    const pool = await createPool();
    const sql = "UPDATE users SET isBanned = 1 WHERE Username = ?";
    const [result] = await pool.execute(sql, [username]);
    return result.affectedRows > 0; // true om en rad påverkades (användaren fanns)
}



module.exports = {
    getUsers, getUsersById, getUserByUsername , addUser, banUser
}