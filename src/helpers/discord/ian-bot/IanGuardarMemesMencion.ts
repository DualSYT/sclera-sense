import { Client, GatewayIntentBits } from 'discord.js';
import { ENV } from '../../../config/envConfig';
import path, { join } from 'path';
import { WriteStream, createWriteStream, existsSync } from 'fs';

const ianGuardarMemesMencion = async () => {
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

    const folderBase = path.join(__dirname, `${ENV.FOLDER_BASE_IMAGENES}/memes/shitpost`);

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const maxSizeBytes = 1 * 1024 * 1024;

    client.once('ready', () => {
        console.log(`${client.user?.tag} Funcion Guardar Memes Mencion Activada`);
    });

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (message.mentions.users.size === 0) return;

        const content = message.content.toLowerCase();
        if (
            content.includes('shitpost') ||
            content.includes('meme') ||
            content.includes('momo') ||
            content.includes('memardo')
        ) {
            if (message.attachments.size > 0) {
                message.attachments.forEach(async (attachment) => {

                    const fileExtension = path.extname(attachment.name).toLowerCase();
                    const fileSize = attachment.size;

                    if (allowedExtensions.includes(fileExtension) && fileSize <= maxSizeBytes) {
                        const filePath = join(folderBase, attachment.name);

                        if (!existsSync(filePath)) {
                            const fileStream = createWriteStream(filePath);
                            const request = require('https').get(attachment.url, (response: { pipe: (arg0: WriteStream) => void; }) => {
                                response.pipe(fileStream);
                            });

                            message.channel.send(`${message.author.toString()} ¡Genial! Acabo de guardar tu meme 🎉: ${attachment.name}`);
                            console.log(`Meme guardado: ${attachment.name} Url: ${attachment.url}`);
                        } else {
                            try {
                                await message.delete();
                            } catch (error) {
                                console.error(`Error al borrar el mensaje: ${error}`);
                            }
                            message.channel.send(`${message.author.toString()} Ups, parece que ya teníamos esta imagen 😅: ${attachment.name}`);
                        }
                    } else {

                        if (!allowedExtensions.includes(fileExtension)) {
                            message.channel.send(`${message.author.toString()} ¡Vaya! Parece que eso no es una imagen 🤖. ¡Inténtalo con una imagen divertida!`);
                        } else {
                            message.channel.send(`${message.author.toString()} ¡Oops! Parece que este archivo es un poco grande 😅. Intenta con uno más pequeñito, por favor.`);
                        }
                        try {
                            await message.delete();
                        } catch (error) {
                            console.error(`Error al borrar el mensaje: ${error}`);
                        }
                    }
                });
            }
        }
    });

}

export { ianGuardarMemesMencion }