import express from 'express';
import { createServer } from 'node:http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

//Socket.io
io.on('connection', (socket) => {
    socket.on('user-message', (msg) => {
        io.emit('message', msg);
      });
});

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.sendFile("/public/index.html");
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});