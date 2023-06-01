import client from "../../../../../database/client"
import { ws } from "../../../ws/webSocket";
import { isValid } from "../../../../utils/isValid";

export const sendChat = async (req, res) => {

  try{
    const {
      senderId,
      roomId,
      payload
    } = req?.body

    //* check if user exists.
    const user = await client?.user?.findFirst({
      where: {
        id: senderId
      }
    });

    if(!isValid(user)){ //* No user found
      throw new Error("Error: There are no such user");
    }

    //* check if room exists.
    const room = await client?.room?.findFirst({
      where: {
        id: roomId
      }
    });

    if(!isValid(room)){
      throw new Error("Error: There are no such room");
    }

    //* Save Data
    const message = await client.message.create({
      data: {
        sender: {
          connect: {
            id: senderId
          }
        },
        room: {
          connect: {
            id: roomId
          }
        },
        payload,
      }
    });

    //* Send Message

    res.json({
      ok: true,
      message
    });

  }catch (e){
    
    //* Error Handling
    res?.json({
      ok: false,
      error: e?.message
    });
  }
}