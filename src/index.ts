import {Server} from './models/Server'
require('dotenv').config();

try
{
    const server = new Server()
    server.listen()

}
catch (err: any) {
    console.error(err)
}
