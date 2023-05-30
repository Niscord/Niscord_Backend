//* Niscord: Backend
import express, { json } from "express";
import { mainRouter } from "./route/route";//* Router Import
import {createServer} from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import cors from 'cors';
import options from "../../swagger/swagger";
import { Server } from "socket.io";
import { webSock } from "./ws/webSocket";


const dotenv = require("dotenv").config();

const app = express();
const specs = swaggerJSDoc(options); //* Swagger Options

const PORT = process.env.PORT;
const MODE = process.env.MODE;

//* Server Setting
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('trust proxy', 1);
app.use(cors({ origin: '*' }), json());

app.use('/', mainRouter);

//* Swagger Docs Endpoint
app.use('/', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

//* web socket
const server = createServer(app);
webSock(server);

app.listen(PORT, () => {
  MODE === 'DEV' 
    ? console.log(`🤖🤖🤖 DEV MODE: Current server is running on http://localhost:${PORT}  🤖🤖🤖`)
    : console.log("💫💫💫 PRODUCTION MODE: Server Launched! 💫💫💫");
});