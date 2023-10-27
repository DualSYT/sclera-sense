import { Client, GatewayIntentBits } from 'discord.js';
import { ENV } from '../../../config/envConfig';

const ianExplicarComandos = async () => {
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

    client.once('ready', () => {
        console.log(`${client.user?.tag} Funcion Explicar Comandos Activada`);
    });

    client.on('messageCreate', (message) => {
        if (message.content === '/ian-comandos') {
            const embed = {
                title: '¡Mis Comandos! 🤖',
                description: '¡Aquí tienes una lista de comandos disponibles! 😄',
                color: 0xff7b00,
                fields: [
                    { name: '/ian-comandos', value: 'Recibe un resumen sobre los comandos disponibles 👀' },
                    { name: 'meme - shitpost - memardo - momo', value: 'Escribe algunas de estas palabras claves para que guarde tu meme y lo publique de manera al azar mas adelante, debes adjuntar una imagen para que funcione 🤖' },
                ],
                footer: {
                    text: 'Espero que estos comandos sean útiles 😄',
                },
            };

            message.channel.send({ content: ' ', embeds: [embed] });
        }
    });
}

export { ianExplicarComandos }