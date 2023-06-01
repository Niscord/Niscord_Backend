import socketIO, { Server } from "socket.io"

export const webSockInit = (server) => {
  const ws = socketIO(server, {
    cors: {
      origin: "*",
    }
  });

  return ws;
}

export const handleSocketConnection = (ws) => {

  ws.on("connection", socket => {
    console.log("Socket Connected!");

    socket.on('message', (message) => {
      console.log(message);

      socket.broadcast.emit('recv_message', message);

    })

  })
}