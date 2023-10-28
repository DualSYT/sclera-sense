import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDatabase = async (query: string) => {
    const dbName = `${__dirname}/db.db`;
    
    const db = await open({
        filename: dbName,
        driver: sqlite3.Database,
    });

    await db.run(query);

    return db;
}

export {initDatabase}