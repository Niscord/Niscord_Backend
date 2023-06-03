import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";

export const queryUserId = async (req,res) => {
  const body = req?.body;

  const username = body?.username

  try{
    const userId = await client.user.findFirst({
      where: {
        username
      },
      select: {
        id: true
      }
    });

    if(!isValid(userId)){
      throw new Error("No Such User");
    }

    res.json({
      ok: true,
      userId
    });
    
  }catch (e){
    res.json({
      ok: false,
      error: e.message,
    });
  }
}