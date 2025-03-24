const mysql = require('mysql2/promise');
require("dotenv").config();


async function createPool() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost", //process.env sparar environment variabler i Node.js och låter oss spara sensitiv information i .env
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",  
        database: process.env.DB_NAME || "fakediscord",
        waitForConnections: true,
        connectionLimit: 10, //Antal kopplingar en databas pool kan ha
        queueLimit: 0 //Antal queries som kan vänta i kö när alla kopplingar är upptagna
    });

    try {
       
        await pool.getConnection();
        console.log('Database pool connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }

    return pool;
}

module.exports = createPool; 

/*Pool är en samling av återanvändbara databaskopplingar och hjälper med hastighet,
minskar databas last och är hanteras automatiskt*/
