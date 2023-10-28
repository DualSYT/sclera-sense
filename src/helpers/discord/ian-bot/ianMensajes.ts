
import { ENV } from '../../../config/envConfig';
import path, { join } from 'path';
import fs from 'fs';
import { exportClientDiscord } from '../exportClientDiscord';


const ianMensajeEstoyVivo = async () => {
    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    clientDiscord.once('ready', async () => {
        console.log(`${clientDiscord.user?.tag} Estoy Vivo!`);
        const targetChannel: any = clientDiscord.channels.cache.get(String(ENV.CHANNEL_ID_GENERAL));
        await targetChannel.send({
            content: "Estoy vivo de nuevo 🤖",
        });
    });
}

const ianMensajeMeEstoyReiniciando = async () => {
    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    clientDiscord.once('ready', async () => {
        console.log(`${clientDiscord.user?.tag} Me estoy reiniciando!`);
        const targetChannel: any = clientDiscord.channels.cache.get(String(ENV.CHANNEL_ID_GENERAL));
        await targetChannel.send({
            content: "Me estoy reiniciando... 🤖",
        });
    });
}

export { ianMensajeEstoyVivo,ianMensajeMeEstoyReiniciando }