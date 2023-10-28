import { ENV } from '../../../config/envConfig';
import fs from 'fs'
import path from 'path';
import { exportClientDiscord } from '../exportClientDiscord';
import { Client } from 'discord.js';


const ianPostImagenesTimer = async (folder:string,subFolder:string,motif:string,channelId:string,timer:number) => {

    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    const folderBase = path.join(__dirname,`${ENV.FOLDER_BASE_IMAGENES}/${folder}/${subFolder}`);

    clientDiscord.once('ready', () => {
        console.log(`${clientDiscord.user?.tag} Funcion Post ${motif} Activada`);
    });

    setInterval(async () => {
        await fetchImages(folderBase,clientDiscord,motif,channelId);
    }, timer * 1000);
}

const fetchImages= async (folderBase:string,clientDiscord: Client<boolean>,motif: string,channelID:string) => {
    const targetChannel: any = clientDiscord.channels.cache.get(channelID);
    try {
        const image: any = await getRandomImage(folderBase);
        const folderPathImage= path.join(folderBase, image);
        if (image) {
            console.log(`${motif}: ${image} `);
              await targetChannel.send({
                files: [folderPathImage],
                });
        } else {
            console.error(`No se encontraron ${motif} en la carpeta.`);
        }
    } catch (error) {
        console.error(`Error al obtener ${motif}:`, error);
    }
};

const getRandomImage = async (folderBase:string) => {
    const imageFiles = fs.readdirSync(folderBase);
    if (imageFiles.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    return imageFiles[randomIndex];
}

export { ianPostImagenesTimer };