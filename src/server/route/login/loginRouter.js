import { Router } from "express";
import client from '../../../../database/client';
import {isValid} from '../../../utils/isValid';
import { userLogin } from "./controller/userLogin";

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
 *             $ref: '#/components/schemas/ResponseLogin'
 *             
 */
loginRouter.post('/', userLogin);