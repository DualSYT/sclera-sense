import { writeFileSync } from "fs";
import { ENV } from "../../../config/envConfig";
import { Client, GatewayIntentBits } from 'discord.js';
import path from "path";
import moment from "moment-timezone";
import { exportClientDiscord } from "../exportClientDiscord";

const ianRespaldarMensajesDeCanal = async (channelId: string, jsonName: string) => {

    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    let outputFilePath = path.join(__dirname, String(ENV.FOLDER_BASE_CHATS), `${jsonName}.json`);

    clientDiscord.once('ready', async () => {

        console.log(`${clientDiscord.user?.tag} Función Respaldo Mensajes de Canal Activada`);

        const channel: any = clientDiscord.channels.cache.get(channelId);

        if (!channel) {

            console.error('El canal no se encontró en la caché del cliente.');

            return;
        }
        const messagesData = [];

        let allMessages = await channel.messages.fetch({ limit: 100 });

        while (allMessages.size > 0) {

            for (const message of allMessages.values()) {
                
                const messageData = {
                    username: sanitizeString(message.author.username),
                    content: sanitizeString(message.content),
                    sentImage: message.attachments.size > 0,
                    channel: sanitizeString(message.channel.name),
                    timestamp: moment(message.createdTimestamp).tz('America/Santiago').format('DD-MM-YYYY'),

                };
                console.log(messageData);
                messagesData.push(messageData);
            }

            const lastMessage = allMessages.last();
            allMessages = await channel.messages.fetch({ limit: 100, before: lastMessage.id });
        }
        const jsonData = JSON.stringify(messagesData, null, 2);
        writeFileSync(outputFilePath, jsonData, 'utf-8');

        console.log(`Mensajes respaldados en ${outputFilePath}`);
    });
}

const sanitizeString = (inputString: string) => {
    return inputString.replace(/[^a-zA-Z0-9-_.@#&,\s]/g, '');
}


export { ianRespaldarMensajesDeCanal };