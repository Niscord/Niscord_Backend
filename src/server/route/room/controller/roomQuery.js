import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";


export const roomQuery = async (req,res) => {
  const body = req?.body;
  const hostId = body?.hostId;

  try{
    if(!isValid(hostId)){
      //* Not Valid Host Id.
      throw new Error("Fatal error: Given Host id is not valid.");
    }

    const roomList = await client.room.findMany({
      where: {
        hostId
      }
    });

    res.json({
      ok: true,
      data: roomList
    });

  }catch(e){
    //* Error Handling
    res.json({
      ok: false,
      error: e.message
    });
  }
}