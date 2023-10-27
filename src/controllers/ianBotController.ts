import { Request, Response, RequestHandler} from 'express'
import { ianRespaldoImagenesCanales } from '../helpers/discord/ian-bot/ianRespaldoImagenesCanal';
import { ianRespaldarMensajesDeCanal } from '../helpers/discord/ian-bot/ianRespaldoChats';

const ianBotController: RequestHandler = async (req: Request, res: Response) => {
    try{
    
        let {body} = req;
        let {action} = body;

        if (action === "IAN-1") {
            let { channelId, folder, subFolder } = body;
            await ianRespaldoImagenesCanales(channelId, folder, subFolder);
        } else if (action === "IAN-2") {
            let { channelId, jsonName } = body;
            await ianRespaldarMensajesDeCanal(channelId,jsonName); 
        }

        res.status(200).json(body)
    }
    catch (err: any) {
        res.status(400).json({
            status: 400,
            info: "Ocurrio un error en la peticion",
            respuesta: err.toString(),
        })
    }
}

export {ianBotController}
