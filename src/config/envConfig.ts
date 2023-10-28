require('dotenv').config();
export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL ||'mongodb://localhost:27017',
    TOKEN_DISCORD: process.env.TOKEN_DISCORD || '',
    TOKEN_DISCORD_CYPHER: process.env.TOKEN_DISCORD_CYPHER || '',
    CHANNEL_ID_SHITPOST: process.env.CHANNEL_ID_SHITPOST,
    FOLDER_BASE_IMAGENES: process.env.FOLDER_BASE_IMAGENES,
    FOLDER_BASE_CHATS: process.env.FOLDER_BASE_CHATS,
    CHANNEL_ID_GENERAL: process.env.CHANNEL_ID_GENERAL,
}