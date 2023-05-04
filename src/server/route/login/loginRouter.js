import { Router } from "express";
import client from '../../../../database/client';
import {isValid} from '../../../utils/isValid';

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login Management
 */
export const loginRouter = Router();

/**
 * @swagger
 *  /login:
 *    get:
 *      tags:
 *      - Login
 *      description: Test Endpoint - need to be removed after testing
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: Test Successful
 */
loginRouter.get('/', (req, res) => {
  res.send("Login Main");
});

/**
 * @swagger
 *  /login:
 *    post:
 *      tags:
 *      - Login
 *      description: Login Request
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *         properties:
 *          ident:
 *            type: string
 *          password:
 *             type: string
 *      responses:
 *       200:
 *        description: Successful Login
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ok: 
 *                 type: boolean
 *                 description: Indicates response result
 *               error: 
 *                 type: string
 *                 description: Shows error if there are some errors
 *               token:
 *                 type: string
 *                 descrption: JWT token for logined user. It needed to be saved in cookie.
 */
loginRouter.post('/', async (req, res) => {
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
      token: 'test'
    });
    

  }catch (e){

    //* Error Handling
    res.json({
      ok: false,
      error: e.message,
    });
  }
})