const mysql = require("mysql2/promise") //använda async istället för callback, lättare att koda

async function getConnection() {  //Kopplar till databasen
    return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fakediscord",
})
}

async function getUser() { //Skapar en funktion getUser 
    const connection = await getConnection(); //Väntar på att koppla till databsen innan den utför resten av koden
    try {
        const [rows] = await connection.execute(`SELECT * FROM users`); //Hämtar allt från tabellen users efter den har en koppling till databasen
        return rows
    } catch (error) {
        console.log("något är fel", error);
        throw new Error("getUsers är problemet")
    } finally {
        (await connection).end()
    }
}

module.exports = ( //Funktioner som kan användas i andra filer så länge de är kopplade till den här filen
getUser
)