import { Client, GatewayIntentBits } from 'discord.js';
import { ENV } from '../../../config/envConfig';
import fs from 'fs'
import path from 'path';

const ianPostMemes = async () => {
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

    const folderBase = path.join(__dirname,`${ENV.FOLDER_BASE_IMAGENES}/memes/shitpost`);

    client.once('ready', () => {
        console.log(`${client.user?.tag} Funcion Post Meme Activada`);
    });

    setInterval(() => {
        const fetchMemes= async () => {
            const targetChannel: any = client.channels.cache.get(String(ENV.CHANNEL_ID_SHITPOST));
            try {
                const meme: any = await getRandomMeme();
                const folderPathMemes= path.join(folderBase, meme);
                if (meme) {
                    console.log("meme: " + meme);
                      await targetChannel.send({
                        files: [folderPathMemes],
                        });
                } else {
                    console.error('No se encontraron memes en la carpeta.');
                }
            } catch (error) {
                console.error('Error al obtener el meme:', error);
            }
        };
        const getRandomMeme = async () => {
            const memeFiles = fs.readdirSync(folderBase);
            if (memeFiles.length === 0) {
                return null;
            }
            const randomIndex = Math.floor(Math.random() * memeFiles.length);
            return memeFiles[randomIndex];
        }
        fetchMemes();
    }, 300000);
}

export { ianPostMemes };