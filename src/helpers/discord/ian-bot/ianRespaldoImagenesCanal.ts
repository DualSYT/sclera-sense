import { existsSync, writeFileSync } from "fs";
import { ENV } from "../../../config/envConfig";
import { promises as fsPromises } from 'fs';
import path from 'path';
import { exportClientDiscord } from "../exportClientDiscord";

const ianRespaldoImagenesCanales = async (channelId: string, folder: string, subfolder: string) => {
    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    clientDiscord.once('ready', async () => {

        console.log(`${clientDiscord.user?.tag} Función Respaldo Imágenes Canal Activada`);

        const channel: any = clientDiscord.channels.cache.get(channelId);

        if (!channel) {
            console.error('El canal no se encontró en la caché del cliente.');
            return;
        }    

        const folderPath = path.join(__dirname, String(ENV.FOLDER_BASE_IMAGENES), folder);
        console.log(folderPath)
        const subfolderPath = path.join(folderPath, subfolder);
        console.log(subfolderPath)

        try {
            await fsPromises.access(folderPath);
        } catch (err) {
            await fsPromises.mkdir(folderPath, { recursive: true });
        }

        try {
            await fsPromises.access(subfolderPath);
        } catch (err) {
            await fsPromises.mkdir(subfolderPath, { recursive: true });
        }

        let allMessages = await channel.messages.fetch({ limit: 100 }); 

        while (allMessages.size > 0) {
            for (const message of allMessages.values()) {
                for (const [key, attachment] of message.attachments.entries()) {
                    const fileName = attachment.name || 'image.png';
                    const filePath = path.join(subfolderPath, fileName);
        
                    if (
                        attachment.contentType &&
                        attachment.contentType.startsWith('image') &&
                        await isValidImageFileName(fileName)
                    ) {
                        if (!existsSync(filePath)) {
                            if (attachment.size <= 7024 * 7024) {
                                const response = await fetch(attachment.url);
                                const buffer = await response.arrayBuffer();
        
                                const imageBuffer = Buffer.from(buffer);
                                writeFileSync(filePath, imageBuffer);
                                console.log(`Imagen guardada: ${fileName}`);
                            } else {
                                console.log(`La imagen ${fileName} excede el tamaño máximo permitido (1MB).`);
                            }
                        } else {

                            const randomFileName = generateRandomFileName(fileName);
                            const newFilePath = path.join(subfolderPath, randomFileName);
        
                            if (!existsSync(newFilePath)) {
                                const response = await fetch(attachment.url);
                                const buffer = await response.arrayBuffer();
                                const imageBuffer = Buffer.from(buffer);
                                writeFileSync(newFilePath, imageBuffer);
                                console.log(`La imagen ${fileName} ya existe, renombrada como ${randomFileName}`);
                            }
                        }
                    }
                }
            }
        
            const lastMessage = allMessages.last();
            allMessages = await channel.messages.fetch({ limit: 100, before: lastMessage.id });
        }
    });
}

const isValidImageFileName = async (fileName: string): Promise<boolean> => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi', '.mkv', '.wmv', ".webm"];
    const fileExtension = fileName.split('.').pop();
    return allowedExtensions.includes(`.${fileExtension}`);
}

const generateRandomFileName = (fileName:string) => {
    const randomString = Math.random().toString(36).substring(7);
    return `${randomString}-${Date.now()}.${fileName.split('.').pop()}`;
}    

export { ianRespaldoImagenesCanales }