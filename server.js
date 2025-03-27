// Import required modules
const express = require("express");                
const { engine } = require("express-handlebars"); 
const http = require("http");                      
const socketio = require("socket.io");             
const path = require("path");                     
const dotenv = require("dotenv");                 
const db = require("./server/config/db"); 
const authRoutes = require("./server/routes/auth"); 
const chatRoutes = require("./server/routes/chat"); 
const { setupSockets } = require("./server/sockets/socket"); 


dotenv.config();

// Startar express
const app = express();
const server = http.createServer(app); // Kopplar express till HTTP server
const io = socketio(server); // Startar socket

// Sätter Handlebars som view template
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Hanterar requests
app.use(express.urlencoded({ extended: true })); //Läser "User submitted" data
app.use(express.json()); // Läser JSON requests
app.use(express.static(path.join(__dirname, "Public"))); // Hanterar static files

// Routing till olika funktioner
app.use("/auth", authRoutes); // Hanterar login & register
app.use("/chat", chatRoutes); // Chat relaterade routing


// Startar websocket events
setupSockets(io);

// Skickar användare direkt till register
app.get("/", (req, res) => {
    res.render("index"); 
});

app.get("/register", (req, res) => {
    res.render("register"); 
});

app.get("/login", (req, res) => {
    res.render("login"); 
});

// Startar servern
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
