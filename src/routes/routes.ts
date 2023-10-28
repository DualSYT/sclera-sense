import { Router, Request, Response } from 'express';
import { routerIanBot } from './ianBotRoutes';
import { routerCypher } from './cypherBotRouters';

const router = Router();

router.use("/bots/ian-bot",routerIanBot);
router.use("/bots/cypher-bot",routerCypher);

// Para el resto
router.use(function (req, res) {
    res.status(404).json({
      status: 404,
      info: "URL Desconocida",
      respuesta: "Dirección URL no válida",
    });
  });

export default router;