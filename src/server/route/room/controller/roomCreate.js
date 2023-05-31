import { isValid } from "../../../../utils/isValid";
import { generateCode } from "../../../../utils/codeGen";
import client from "../../../../../database/client";

export const roomCreate = async (req, res) => {
  const body = req?.body;

  const hostId = body?.hostId;

  try{
    if(!isValid(hostId)) //* check if host id field is valid
      throw new Error("Fatal Error: Given host id is not valid.");

    //* Search current user
    const host = await client.user.findFirst({
      where: {
        id: hostId,
      },
    });

    if(!isValid(host)) //* Error: Cannot Find Host.
      throw new Error("There is no such user."); 
    
    //* Room Creation
    const code = generateCode().toUpperCase();

    const room = await client.room.create({
      data: {
        host: {
          connect: {
            id: hostId,
          },
        },
        roomCode: code
      },
    });

    
    if(!isValid(room)) //* Creation Failed
    throw new Error("Fatal Error: Something gone wrong while creating room");
    
    //* Update host information
    await client.user.update({
      where: {
        id: hostId,
      },
      data: {
        hosting: {
          connect: {
            id: room?.id,
          }
        },
        joining: {
          connect: {
            id: room?.id,
          }
        }
      }
    });

    res.json({
      ok: true,
      room
    });
    
  }catch(e){
    
    //* Error Handling
    res.json({
      ok: false,
      error: e.message
    })
  }
}