import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";

export const roomJoin = async (req, res) => {
  const body = req?.body;

  try{
    const {
      userId,
      roomCode,
    } = body;

    //* Check Room Code
    const room = await client.room.findFirst({
      where: {
        roomCode,
      },
    });

    if(!isValid(room)) //* No Room
      throw new Error("There are no such room.");

    if(room?.member?.length() >= 6) //* User cannot join: room with 6 members.
       throw new Error("Room Full!");

    //* checkUser
    const user = await client.user.findFirst({
      where: {
        id: userId
      },
    });

    if(!isValid(user)) //* No User
      throw new Error("There are no such user.");

    //* joined (room object)
    const joined = await client.room.update({
      where: {
        id: room?.id,
      },
      data: {
        member: {
          connect: {
            id: userId
          },
        },
      },
    });

    if(!isValid(joined)) //*Joining Failed
      throw new Error("Fatal Error: User Joining Failed!!!");

    //* Update User Info
    await client.user.update({
      where: {
        id: userId
      },
      data: {
        joining: {
          connect: {
            id: joined?.id
          }
        }
      }
    });

    res.json({
      ok: true,
      room: joined,
    });
      
  } catch(e){
    //* Error Handling
    res.json({
      ok: false,
      error: e.message
    });
  }
}