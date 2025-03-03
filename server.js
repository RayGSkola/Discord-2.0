const express = require("express");
const { engine } = require("express-handlebars");
const UsersDB = require("./server/UsersDB");
const http = require("http");
const socketio = require("socket.io");
const path = require("path")

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, 'Public')))

app.get("/", (req, res) => {
  res.render("register");  
});


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit('message')
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
