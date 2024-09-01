const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { sql, poolPromise } = require("./db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/messages", require("./routes/messages"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
