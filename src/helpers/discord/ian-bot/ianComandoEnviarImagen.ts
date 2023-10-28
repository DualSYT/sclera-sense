import { ENV } from '../../../config/envConfig';
import path, { join } from 'path';
import fs from 'fs';
import { exportClientDiscord } from '../exportClientDiscord';

const ianComandoEnviarImagen = async (folder: string, subFolder: string, motif: string, includesArray: string[]) => {

    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    const folderBase = path.join(__dirname, `${ENV.FOLDER_BASE_IMAGENES}/${folder}/${subFolder}`);

    clientDiscord.once('ready', () => {
        console.log(`${clientDiscord.user?.tag} Funcion Comando Enviar Imagen de ${motif} Activada`);
    });

    clientDiscord.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        const content = message.content.toLowerCase();

        if (includesArray.includes(content)) {

            fs.promises.readdir(folderBase)
                .then(files => {
                    const randomIndex = Math.floor(Math.random() * files.length);
                    const randomImage = files[randomIndex];

                    const imagePath = path.join(folderBase, randomImage);

                    message.channel.send({ files: [imagePath] });
                })
                .catch(error => {
                    console.error('Error al leer la carpeta de memes:', error);
                    message.channel.send(`Lo siento, ha ocurrido un error al buscar ${motif}.`);
                });
        }
    });

}

export { ianComandoEnviarImagen }