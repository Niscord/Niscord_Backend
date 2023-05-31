import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";

export const roomInvite = async (req, res) => {
  const body = req?.body;

  const username = body?.username;
  const roomId = body?.roomId;

  try{
    //* Search such user.

    const user = await client.user.findFirst({
      where: {
        username
      }
    });

    if(!isValid(user)){
      //* Not valid user
      throw new Error("There is no such user.");
    } 

    //* Join to the room.
    const member = await client.room.update({
      where: {
        id: roomId,
      },
      select: {
        member: true,
      },
      data: {
        member: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    res?.json({
      ok: true,
      member
    });
    
  }catch (e){
    console.log(e.message)
    res?.json({
      ok: false,
      error: e.message
    })
  }
}