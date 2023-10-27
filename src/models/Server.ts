import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import router from "../routes/routes"
import { ENV } from '../config/envConfig'
import { dbConnect } from '../config/db';
import { ianAlive } from '../helpers/discord/ian-bot';

class Server {
    private app: any
    private port: any
    constructor() {
        this.port = ENV.PORT || 8080;
        this.app = express();
        this.middlewares()
        this.routes();
        //this.connect();
        this.bots();
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    routes() {
        this.app.use(router)
    }

    async bots()
    {
        await ianAlive();
    }

    async connect(){
        await dbConnect()
    }

    listen() {
        try {
            this.app.listen(this.port, () => {
                console.log(`Servidor corriendo en el puerto: ${this.port}`)
            })
        }
        catch (err: any) {
        }
    }
}
export { Server }