import client from "../../../../../database/client";
import { isValid } from "../../../../utils/isValid";

export const queryUserPassword = async (req, res) => {
  const body = req?.body;
  const ident = body?.ident;

  try{
    const password = await client.user.findFirst({
      where: {
        ident
      },
      select: {
        password: true
      }
    });

    if(!isValid(ident)) {
      throw new Error("No such user");
    }

    res.json({
      ok: true,
      password
    });

  }catch(e) {
    res.json({
      ok: false,
      error: e.message
    })
  }
}