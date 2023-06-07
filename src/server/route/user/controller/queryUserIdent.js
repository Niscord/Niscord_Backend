import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";

export const queryUserIdent = async (req, res) => {
  const body = req?.body;
  const username = body?.username;

  try{
    const ident = await client.user.findFirst({
      where: {
        username
      },
      select: {
        ident: true
      }
    });

    if(!isValid(ident)) {
      throw new Error("No such user");
    }

    res.json({
      ok: true,
      ident
    });

  }catch(e) {
    res.json({
      ok: false,
      error: e.message
    })
  }
}