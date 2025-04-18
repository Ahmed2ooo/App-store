process.env.GOOGLE_APPLICATION_CREDENTIALS = './dialogflowcx-twilio-d1ccf4aa36cc.json';

import express from "express";
import { bootstrap } from "./src/utils/bootstrab.js";

const app = express();
app.use(express.json())
bootstrap(app) 