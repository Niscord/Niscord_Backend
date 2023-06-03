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

      socket.broadcast.emit('recv_message', message);

    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('disconnected');
    })

    //* Voice Chat
    socket.on("voice_chat_call", (data) => {
      ws.emit("voice_chat_call", {
        signal: data?.signalData,
        from: data?.from,
        name: data?.name,
        userToCall: data?.userToCall
      })
    })

    socket.on("voice_chat_recv", (data) => {
      ws.emit("voice_chat_accept", {
        signal: data.signal,
        from: data.from
      })
    })

    socket.on("voice_call_end", (data) => {
      ws.emit("voice_call_end", {from: data?.from});
    })

    //* Video Chat
    socket.on("video_chat_call", (data) => {
      console.log("ChatCall");
      ws.emit("video_chat_call", {
        signal: data?.signalData,
        from: data?.from,
        name: data?.name,
        userToCall : data?.userToCall
      })
    })

    socket.on("video_chat_recv", (data) => {
      ws.emit("video_chat_accept", {signal: data.signal, from: data?.from});
    })

    socket.on("video_call_end", (data) => {
      ws.emit("video_call_end", {from: data?.from});
    })


  })
}