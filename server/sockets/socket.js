module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected");
  
      socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  };
  