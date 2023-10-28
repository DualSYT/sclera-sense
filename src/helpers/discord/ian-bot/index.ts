import { ianExplicarComandos } from "./ianExplicarComandos";
import { ianPostImagenesTimer } from "./ianPostImagenesTimer";
import { ENV } from "../../../config/envConfig";
import { ianGuardarImagenesMencion } from "./IanGuardarImagesMencion";
import { ianComandoEnviarImagen } from "./ianComandoEnviarImagen";
import { exportClientDiscord } from "../exportClientDiscord";
import { ianMensajeEstoyVivo, ianMensajeMeEstoyReiniciando } from "./ianMensajes";

const ianAlive = async () => {
    await ianMensajeMeEstoyReiniciando();
    await ianExplicarComandos();
    await ianPostImagenesTimer("memes","power","Power Gifs",String(ENV.CHANNEL_ID_SHITPOST),200);
    await ianPostImagenesTimer("memes","shitpost","Memes",String(ENV.CHANNEL_ID_SHITPOST),150);
    await ianGuardarImagenesMencion("memes","power","Power Gifs",["/ian-save-power","/ian-save-power-gif"],['.gif']);
    await ianGuardarImagenesMencion("memes","shitpost","Memes",["/ian-save-meme"],['.jpg', '.jpeg', '.png', '.gif']);
    await ianComandoEnviarImagen("memes","power","Power Gifs",["/ian-power","/ian-power-gif"]);
    await ianComandoEnviarImagen("memes","shitpost","Meme",["/ian-meme"]);
    await ianMensajeEstoyVivo();
}

export { ianAlive };