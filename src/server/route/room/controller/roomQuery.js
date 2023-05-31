import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";


export const roomQuery = async (req,res) => {
  const body = req?.body;
  const hostId = body?.hostId;
  const joinedRoomIdList = [];
  try{
    if(!isValid(hostId)){
      //* Not Valid Host Id.
      throw new Error("Fatal error: Given Host id is not valid.");
    }


    const joinedList = await client.user.findFirst({ //* Get User Joined List
      where: {
        id: hostId,
      },
      select: {
        joining: {
          select: {
            id: true,
          }
        }
      },
    });

    if(joinedList?.joining?.length > 0){ //* If the value is valid
      joinedList?.joining?.forEach(element => {
        joinedRoomIdList.push(element.id); //* Make an id array
      });
    }

    const roomList = await client.room.findMany({ //* Retrieve all joined room.
      where: {
        id: {
          in: joinedRoomIdList,
        },
      },
      include: {
        member: true
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