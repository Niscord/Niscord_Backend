import { Router } from "express";
import { sendChat } from "./controller/sendChat";

/**
 * @swagger
 * tags:
 *  name: Chat
 *  description: Chat Management
 */
export const chatRouter = Router();

/**
 * @swagger
 *  /chat/send:
 *    post:
 *      tags:
 *      - Chat
 *      description: send chat message
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/Message'
 *      responses:
 *       200:
 *        description: Successful Room Joining
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseChat'
 */
chatRouter.post('/send', sendChat);