import client from "../../../../../database/client";


export const readRoomChat = async (req, res) => {
  const body = req?.body;
  const roomId = body?.roomId;

  try{
    const messageList = await client.message.findMany({
      where: {
        roomId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json({
      ok: true,
      message: messageList
    });
  }catch (e){
    res.json({
      ok: false,
      error: e.message,
    })
  }
}