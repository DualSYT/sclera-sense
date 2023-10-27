import { writeFileSync } from "fs";
import { ENV } from "../../../config/envConfig";
import { Client, GatewayIntentBits } from 'discord.js';
import path from "path";
import moment from "moment-timezone";

const ianRespaldarMensajesDeCanal = async (channelId: string, jsonName:string) => {
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

    let outputFilePath = path.join(__dirname, String(ENV.FOLDER_BASE_CHATS), `${jsonName}.json`);

    client.once('ready', async () => {
        console.log(`${client.user?.tag} Función Respaldo Mensajes de Canal Activada`);

        // Espera a que el cliente esté listo antes de continuar
        const channel: any = client.channels.cache.get(channelId);

        if (!channel) {
            console.error('El canal no se encontró en la caché del cliente.');
            return;
        }

        const messagesData = [];

        let allMessages = await channel.messages.fetch({ limit: 100 });

        while (allMessages.size > 0) {
            for (const message of allMessages.values()) {
                const messageData = {
                    username: message.author.username,
                    content: message.content,
                    sentImage: message.attachments.size > 0,
                    channel: message.channel.name,
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



export { ianRespaldarMensajesDeCanal };