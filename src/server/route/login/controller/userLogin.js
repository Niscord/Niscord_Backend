import { isValid } from "../../../../utils/isValid";
import client from "../../../../../database/client";

export const userLogin = async (req, res) => {
  const body = req?.body;
  
  const ident = body?.ident?.toString();
  const password = body?.password?.toString();

  try{
    //*Error check - empty parameter
    if(ident.length <= 0 || password.length <= 0){
      throw new Error("Empty Parameter");
    }

    //* Search the given id.

    const user = await client.user.findFirst({
      where: {
        ident,
      }
    });

    if(!isValid(user) || user?.password !== password){
      //* Error: Id not found or password didn't match
      throw new Error("Login Failed");
    }

    //* Login successful
    res.json({
      ok: true,
      userId: user?.id,
      userName: user?.username
    });
    

  }catch (e){

    //* Error Handling
    res.json({
      ok: false,
      error: e.message,
    });
  }
}