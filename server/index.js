require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors());
app.use(express.json());

let users = []; // { id, nickname, email, password, socketId, status }

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: CLIENT_URL, methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
  console.log(`User terhubung: ${socket.id}`);

  socket.on("authenticate", (data) => {
    const { isSignUp, email, password, nickname } = data;

    if (isSignUp) {
      if (users.find(u => u.email === email)) {
        return socket.emit("auth_error", "Alamat email sudah terdaftar.");
      }
      const newUser = { email, password, nickname, socketId: socket.id, status: 'online' };
      users.push(newUser);
      socket.emit("auth_success", newUser);
    } else {
      const userIndex = users.findIndex(u => u.email === email && u.password === password);
      if (userIndex !== -1) {
        users[userIndex].socketId = socket.id;
        users[userIndex].status = 'online';
        socket.emit("auth_success", users[userIndex]);
      } else {
        socket.emit("auth_error", "Email atau kata sandi salah.");
      }
    }
    io.emit("update_user_list", users.map(u => ({ nickname: u.nickname, status: u.status, socketId: u.socketId })));
  });

  socket.on("private_message", ({ to, message, from }) => {
    socket.to(to).emit("receive_private_message", {
      id: Date.now(),
      text: message,
      sender: from,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on("disconnect", () => {
    const index = users.findIndex(u => u.socketId === socket.id);
    if (index !== -1) {
      users[index].status = 'offline';
      io.emit("update_user_list", users.map(u => ({ nickname: u.nickname, status: u.status, socketId: u.socketId })));
    }
  });
});

server.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
