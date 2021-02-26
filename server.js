const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT= process.env.PORT|| 3001;
const router= require('./router/router');
const cors= require('cors')


const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  

app.use(router)
io.on('connection',(socket)=>{
    console.log("A user connected");
    socket.on('join',({name,room})=>{
        console.log(name,room);
    })
    socket.on("disconnect",()=>{
        console.log("User left");
    })
})

server.listen(PORT,()=>{
    console.log(`Server started running at ${PORT}`);
})
