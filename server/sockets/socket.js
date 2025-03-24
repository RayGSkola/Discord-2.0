// socket.js

function setupSockets(io) {
  io.on("connection", (socket) => {
      console.log("A user connected");
      
      // Example of socket events
      socket.on("message", (msg) => {
          console.log("Message received: " + msg);
          io.emit("message", msg);
      });

      socket.on("disconnect", () => {
          console.log("A user disconnected");
      });
  });
}

module.exports = { setupSockets };  
