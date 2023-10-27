import { ianExplicarComandos } from "./ianExplicarComandos";
import { ianPostPowerGif } from "./ianPostPowerGif";
import { ianGuardarMemesMencion } from "./IanGuardarMemesMencion";
import { ianPostMemes } from "./ianPostMemes";

const ianAlive = async () => {
    await ianExplicarComandos();
    await ianPostPowerGif();
    await ianPostMemes();
    await ianGuardarMemesMencion();
}

export { ianAlive };