import { Server, Socket as SocketIoSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const httpServer = require('http').createServer()
export const io = new Server(httpServer, { cors: { origin: '*' }});

export type Socket = {
  _whoami?: string;
} & SocketIoSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const getConnectedSockets = (): Array<Socket> => {
  return Array.from(io.sockets.sockets.keys())
    .map((socketId) => io.sockets.sockets.get(socketId))
    .filter((socket) => !!socket) as Array<Socket>
}

io.on("connection", (socket: Socket) => {
  console.log('socket server connection', socket.id)

  socket.on('who-am-i', (data) => {
    console.log('server received ho-am-i', data)
    socket._whoami = data;
  });
});