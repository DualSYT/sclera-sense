
import { ENV } from '../../../config/envConfig';
import path, { join } from 'path';
import fs from 'fs';
import { exportClientDiscord } from '../exportClientDiscord';


const cypherMensajeDespierto = async () => {
    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD_CYPHER));

    clientDiscord.once('ready', async () => {
        console.log(`${clientDiscord.user?.tag} 👁️‍🗨️ El observador ha despertado...`);
        const targetChannel: any = clientDiscord.channels.cache.get(String(ENV.CHANNEL_ID_GENERAL));
        await targetChannel.send({
            content: "👁️‍🗨️ El observador ha despertado...",
        });
    });
}

const cypherMensajeReinicio= async () => {
    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD_CYPHER));

    clientDiscord.once('ready', async () => {
        console.log(`${clientDiscord.user?.tag} 👁️‍🗨️ Despertando...`);
        const targetChannel: any = clientDiscord.channels.cache.get(String(ENV.CHANNEL_ID_GENERAL));
        await targetChannel.send({
            content: "👁️‍🗨️ Despertando...",
        });
    });
}

export { cypherMensajeDespierto,cypherMensajeReinicio }