import { ENV } from '../../../config/envConfig';
import path, { join } from 'path';
import { WriteStream, createWriteStream, existsSync } from 'fs';
import { exportClientDiscord } from '../exportClientDiscord';

const ianGuardarImagenesMencion = async (folder:string,subFolder:string,motif:string,includesArray:string[],allowedExtensions:string[]) => {

    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    const folderBase = path.join(__dirname, `${ENV.FOLDER_BASE_IMAGENES}/${folder}/${subFolder}`);

    const maxSizeBytes = 8 * 1024 * 1024;

    clientDiscord.once('ready', () => {
        console.log(`${clientDiscord.user?.tag} Funcion Guardar ${motif} Mencion Activada`);
    });

    clientDiscord.on('messageCreate', async (message) => {

        if (message.author.bot) return;
        if (message.mentions.users.size === 0) return;

        const content = message.content.toLowerCase().replace(/<@!?\d+>/, '').trim();
      
        if (includesArray.includes(content)) {
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

                            message.channel.send(`${message.author.toString()} ¡Genial! Acabo de guardar tu ${motif} 🎉: ${attachment.name}`);
                            console.log(`${motif} guardado: ${attachment.name} Url: ${attachment.url}`);
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

export { ianGuardarImagenesMencion }