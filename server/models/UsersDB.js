const pool = require('server\config\db.js');

async function getUsers() {
    try {
        const [rows] = await pool.execute("SELECT * FROM users");
        return rows; //Skapar array rows och sparar allt som man får från "SELECT * FROM users" i den
    } catch (error) {
        console.error("Error in getUsers:", error)
        throw new Error("Database query failed");
    }
}

async function getUsersById() {
    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE Id = ?", [userId]);
        return rows[0]; //Returnerar ett user objekt
    } catch (error) {
        console.error("Error in getUsersById:", error)
        throw new Error("Database query failed");
    }
}

module.exports = {
    getUsers, getUsersById  
}