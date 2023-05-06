import { Router } from "express";
import { roomCreate } from "./controller/roomCreate";
import { roomJoin } from "./controller/roomJoin";

/**
 * @swagger
 * tags:
 *  name: Room
 *  description: Room Management
 */
export const roomRouter = Router();

/** 
 * @swagger
 *  /room/create:
 *    post:
 *      tags:
 *      - Room
 *      description: Room Create Request
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *         properties:
 *          hostId:
 *            type: integer
 *      responses:
 *       200:
 *        description: Successful Room Creation
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseRoom'
 */
roomRouter.post('/create', roomCreate);

/** 
 * @swagger
 *  /room/join:
 *    post:
 *      tags:
 *      - Room
 *      description: Room Join Request
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *         properties:
 *          userId:
 *            type: integer
 *          roomCode:
 *            type: string
 *      responses:
 *       200:
 *        description: Successful Room Joining
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseRoom'
 */
roomRouter.post('/join', roomJoin);

