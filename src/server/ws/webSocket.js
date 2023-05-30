import { Server } from "socket.io"

export const webSock = (server) => {
  const ws = new Server(server);

  console.log("TEST")

  ws.on('connection', (socket) => {
    //* receive order and broadcast ut

    socket.on('join', () => { //* Receives join event
      console.log('connected');
      socket?.removeListener('join', () => {
          console.log('removed join')
      } )
    })


    socket.once('recv_chat', (message) => {
        // once(io?.to(String(cancel?.shopId)).emit('cancel', {
        //     ...cancel
        // }));
        console.log(message);
        socket?.removeListener('recv_chat',() => {
            console.log('removed cancel');
        })
    });
});
}