import { ENV } from '../../../config/envConfig';
import { exportClientDiscord } from '../exportClientDiscord';

const ianExplicarComandos = async () => {

    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD));

    clientDiscord.once('ready', async () => {
        console.log(`${clientDiscord.user?.tag} Funcion Explicar Comandos Activada`);
    });

    clientDiscord.on('messageCreate', (message) => {
        if (message.content === '/ian-comandos') {
            const embed = {
                title: '¡Mis Comandos! 🤖',
                description: '¡Aquí tienes una lista de comandos disponibles! 😄',
                color: 0xff7b00,
                fields: [
                    { name: '/ian-comandos', value: 'Recibe un resumen sobre los comandos disponibles 👀' },
                    { name: '/ian-save-meme', value: 'Escribe algunas de estas palabras claves para que guarde tu meme y lo publique de manera al azar mas adelante, debes adjuntar una imagen para que funcione 🤖' },
                    { name: '/ian-save-power - /ian-save-power-gif', value: 'Escribe algunas de estas palabras claves para que guarde tu gif de power y lo publique de manera al azar mas adelante, debes adjuntar un gif para que funcione 🤖' },
                    { name: '/ian-power - /ian-power-gif', value: 'Escribe algunas de estas palabras claves para que envie un gif de Power 🤖' },
                    { name: '/ian-meme', value: 'Escribe algunas de estas palabras claves para que envie un meme 🤖' },
                ],
                footer: {
                    text: 'Espero que estos comandos sean útiles 😄',
                },
            };

            message.channel.send({ content: '', embeds: [embed] });
        }
    });
}

export { ianExplicarComandos }