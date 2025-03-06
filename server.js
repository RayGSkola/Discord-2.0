
const express = require("express");
const { engine } = require("express-handlebars");
const UsersDB = require("./server/UsersDB");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Hanterar view
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

// Koppla till socket.js
require("./server/socket")(io);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
