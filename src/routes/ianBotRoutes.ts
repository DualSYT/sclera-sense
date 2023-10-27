import { Router } from "express";
import { ianBotController } from "../controllers/ianBotController";

const routerIanBot = Router();

routerIanBot.post("/controller", ianBotController);

export { routerIanBot };
