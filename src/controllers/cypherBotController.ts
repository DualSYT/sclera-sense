import { Request, Response, RequestHandler} from 'express'

const cypherBotController: RequestHandler = async (req: Request, res: Response) => {
    try{
    
        let {body} = req;
        let {action} = body;

        if (action === "CYP-1") {
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

export {cypherBotController}
