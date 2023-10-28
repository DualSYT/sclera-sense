import {cypherGenRandomKey} from "./cypherGenerarLlaveAcceso"
import { cypherMensajeDespierto, cypherMensajeReinicio } from "./cypherMensajes";

const cypherAlive = async () =>
{
    await cypherMensajeReinicio();
    await cypherGenRandomKey();
    await cypherMensajeDespierto();
}

export {cypherAlive}