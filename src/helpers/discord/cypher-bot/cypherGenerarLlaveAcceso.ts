import { ENV } from "../../../config/envConfig";
import { cypherDbSaveUserKey } from "../../../database/cypher-bot/cypherQuerys";
import { exportClientDiscord } from "../exportClientDiscord";

const cypherGenRandomKey = async () => {

    const clientDiscord = await exportClientDiscord();

    await clientDiscord.login(String(ENV.TOKEN_DISCORD_CYPHER));

    clientDiscord.once('ready', () => {
        console.log(`${clientDiscord.user?.tag} Funcion Generar Key Activa`);
    });

    clientDiscord.on('messageCreate', async (message) => {

        if (message.author.bot) return;
        if (message.mentions.users.size === 0) return;

        const content = message.content.toLowerCase().replace(/<@!?\d+>/, '').trim();

        if (content === "/cypher-new-key") {

            let key = await randomKey(100)
            let result = await cypherDbSaveUserKey(message.author.username.toString(),key);
            let userInfo:any = result.userInfo;
            let stringComplement = "Guarda esta info te servira mas adelante..."
            if(userInfo === null){userInfo = "No se ha logrado guardar tu usuario", stringComplement = "Se paciente en algun momento usaras tu llave... ⌚"}
            message.channel.send(`¡Las sombras de la realidad se han movido! 🌌\nResultado de tu registro: ${JSON.stringify(userInfo)}\nDetalle: ${result.resultado} 🕵️‍♂️\n${stringComplement}`);
        }
    });
}

const randomKey = async(long: number): Promise<string> => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+';
    let key = '';
    const charsArray = chars.split('');
    Array.from({ length: long }).forEach(() => {
        const indiceAleatorio = Math.floor(Math.random() * charsArray.length);
        key += charsArray[indiceAleatorio];
    });
    return key;
}

export {cypherGenRandomKey};