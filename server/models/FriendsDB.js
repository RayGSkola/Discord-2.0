const createPool = require("../config/db");



async function DisplayFriends() {
    const pool = await createPool();
    try {
        const [rows] = await pool.execute("SELECT * FROM friends")
        return rows
    } catch (error) {
        console.error("Error in DisplayFriends:", error)
        throw new Error("Database query failed");
    }
}

async function AddFriends() {
    const searchInput = document.getElementById("friendSearch");
    const friendListItems = document.querySelectorAll('#friendList li');
}

module.exports = {DisplayFriends, AddFriends}