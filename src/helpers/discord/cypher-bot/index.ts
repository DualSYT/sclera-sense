import {cypherGenRandomKey} from "./cypherGenerarLlaveAcceso"

const cypherAlive = async () =>
{
    await cypherGenRandomKey();
}

export {cypherAlive}