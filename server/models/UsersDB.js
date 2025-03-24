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
async function getUserByUsername(Username) { //Function som hämtar användare baserat på användarnamn
    const pool = await createPool();
    try {
        const[rows] = await pool.execute("SELECT Username FROM users WHERE Username = ?", [Username]);
        return rows;
    } catch (error) {
        console.error("Error in getUserByUsername", eroor)
        throw new Error("Databse query failed");
    }
}

async function addUser (Username, Displayname, Email, Password) {
    console.log("Inserting into Database", {
        Username, Displayname, Email, Password
    })
    const pool = await createPool();
    const query = "INSERT INTO users (Username, Displayname, Email, Password) VALUES (?,?,?,?)"
    const values = [Username, Displayname, Email, Password]
    try {
        await pool.execute(query,values)
    } catch (error) {
        console.error("Database insertion error:", error);
    throw new Error("Error executing the database query");
    }
}

module.exports = {
    getUsers, getUsersById, getUserByUsername , addUser
}