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
async function getUserByUsername(Username) { //Function som hämtar användare och lösenordet baserat på användarnamn
    const pool = await createPool();
    try {
        const[rows] = await pool.execute("SELECT * FROM users WHERE Username = ?", [Username]);
        console.log("📜 User from DB:", rows[0])
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error in getUserByUsername", error)
        throw new Error("Databse query failed");
    }
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
        return result;
    } catch (error) {
        console.error("Database insertion error:", error);
    throw new Error("Error executing the database query");
    }
}

async function updateUser(id, displayname, email) {
    const [result] = await db.query(
        "UPDATE users SET Displayname = ?, Email = ? WHERE id = ?",
        [displayname, email, id]
    );
    if (result.affectedRows === 0) return null;

    return { id, displayname, email };
}



module.exports = {
    getUsers, getUsersById, getUserByUsername , addUser
}