const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3001;
const router = require("./router/router");
const cors = require("cors");
const userHelpers = require("./helpers/userHelpers");
const { getUser } = require("./helpers/userHelpers");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(router);
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("join", ({ name, room }, callback) => {
    userHelpers
      .addUsers(socket.id, name, room)
      .then((user) => {
        console.log(user);
        socket.emit("message", {
          user: "admin",
          text: `Welcome ${user.name} to ${user.room}`,
        });
        socket.broadcast
          .to(user.room)
          .emit("message", `${user.name} has joined to ${user.room}`);
        socket.join(user.room);
        callback();
      })
      .catch((status) => {
        console.log(status);
      });
  });
  socket.on("disconnect", () => {
    console.log("User left");
  });
  socket.on("sendMessage", (message, callback) => {
    getUser(socket.id).then((user) => {
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started running at ${PORT}`);
});
