import { Server } from "socket.io";

const httpServer = require('http').createServer()
export const io = new Server(httpServer, { cors: { origin: '*' }});

io.on("connection", (socket) => {
  console.log('socket server connection', socket.id)

  socket.on('test created', (data) => {
    console.log('server received test created', data)
  });
});