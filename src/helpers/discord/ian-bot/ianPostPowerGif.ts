import { Client, GatewayIntentBits } from 'discord.js';
import { ENV } from '../../../config/envConfig';
import fs from 'fs'
import path from 'path';

const ianPostPowerGif = async () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.GuildMembers,
        ],
    });

    await client.login(String(ENV.TOKEN_DISCORD));

    const folderBase = path.join(__dirname,`${ENV.FOLDER_BASE_IMAGENES}/memes/power`);

    client.once('ready', () => {
        console.log(`${client.user?.tag} Funcion Post Power Gif Activada`);
    });

    setInterval(() => {
        const fetchGifsPower = async () => {
            const targetChannel: any = client.channels.cache.get(String(ENV.CHANNEL_ID_SHITPOST));
            try {
                const powerGif: any = await getRandomPowerGif();
                const folderPathGifPower = path.join(folderBase, powerGif);
                if (powerGif) {
                    console.log("Power Gif: " + powerGif);
                      await targetChannel.send({
                        content: "Una power 👀",
                        files: [folderPathGifPower],
                        });
                } else {
                    console.error('No se encontraron gif de power en la carpeta.');
                }
            } catch (error) {
                console.error('Error al obtener el gif de power:', error);
            }
        };
        const getRandomPowerGif = async () => {
            const powerFiles= fs.readdirSync(folderBase);
            if (powerFiles.length === 0) {
                return null;
            }
            const randomIndex = Math.floor(Math.random() * powerFiles.length);
            return powerFiles[randomIndex];
        }
        fetchGifsPower();
    }, 200000);
}

export { ianPostPowerGif };