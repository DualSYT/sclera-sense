import { initDatabase } from "../../cypherDb/db";
import { usersQuerysString } from "./usersQuerysStrings"
import moment from "moment-timezone";

const cypherDbSaveUserKey = async (username: string, key: string) => {
    let db;
    try {
        db = await initDatabase(usersQuerysString.createTableUsers);

        // Consulta para verificar si el usuario ya existe con estado "A"
        const existingUser = await db.get(usersQuerysString.selectTableUsersActives, [username, "A"]);

        if (!existingUser) {
            // El usuario no existe con estado "A", se puede crear la clave
            const stmt = await db.run(usersQuerysString.insertTableUsers, username, key, String(moment().tz('America/Santiago').format('DD-MM-YYYY')), "A");

            // Obtener el resultado de la consulta
            const result = {
                resultado: "Exito usuario registrado",
                stmt: stmt.changes,
                userInfo: {
                    username: username,
                    key: key
                }
            };

            return result;
        } else {
            return {
                resultado: "Ya existe el usuario con key activa",
                userInfo: null
            };
        }
    } catch (error: any) {
        console.error('Error al guardar la clave del usuario:', error);
        return {
            resultado: `Error: ${error.toString()}`,
            userInfo: null
        };
    } finally {
        if (db) {
            await db.close();
        }
    }
}

const cypherDbGetUsersByPage = async (page: number, itemsPerPage: number, state: string) => {
    let db;
    try {
        db = await initDatabase(usersQuerysString.createTableUsers);

        const startIndex = (page - 1) * itemsPerPage;

        const users = await db.all(usersQuerysString.selectTableUsersPaginated, state, itemsPerPage, startIndex);

        let result = {
            resultado: "Usuarios obtenidos con exito",
            users
        }

        return result;
    } catch (error: any) {
        console.error('Error al obtener usuarios:', error);
        let result = {
            resultado: "Error " + error.toString(),
            users: []
        }
        return result;
    } finally {
        if (db) {
            await db.close();
        }
    }
}

const cypherDbUpdateUserData = async (username: string, key: string, state: string, id: number) => {
    let db;
    try {
        db = await initDatabase(usersQuerysString.createTableUsers);

        // Consulta para verificar si el usuario existe con estado "A" y la clave coincide
        const existingUser = await db.get(usersQuerysString.selectTableUsersById, [id]);

        if (existingUser) {
            // El usuario existe con estado "A" y la clave coincide, procede con la actualización
            const stmt = await db.run(
                usersQuerysString.updateTableUsers,
                (username !== "" ? username : existingUser.username),
                (key !== "" ? key : existingUser.key),
                (state !== "" ? state : existingUser.state),
                id // Asume que hay un campo "id" en la tabla para identificar al usuario
            );

            // Obtener el resultado de la consulta
            const result = {
                resultado: "Éxito usuario actualizado",
                stmt: stmt.changes
            };

            return result;
        } else {
            return {
                resultado: "Error",
                info: "No se encontró el usuario con la clave proporcionada o el estado no es 'A'"
            };
        }
    } catch (error: any) {
        console.error('Error al actualizar los datos del usuario:', error);
        return {
            resultado: "Error",
            info: error.toString()
        };
    } finally {
        if (db) {
            await db.close();
        }
    }
}

const cypherDbDeleteUserById = async (id: number) => {
    let db;
    try {
        db = await initDatabase(usersQuerysString.createTableUsers);

        // Consulta para eliminar un usuario por ID
        const stmt:any = await db.run(usersQuerysString.deleteUserById, id);

        // Obtener el resultado de la consulta de eliminación
        const result = {
            resultado: stmt.changes > 0 ? "Éxito usuario eliminado" : "Error: usuario no encontrado",
            stmt: stmt.changes
        };

        return result;
    } catch (error: any) {
        console.error('Error al eliminar usuario:', error);
        return {
            resultado: "Error",
            info: error.toString()
        };
    } finally {
        if (db) {
            await db.close();
        }
    }
}



export { cypherDbSaveUserKey, cypherDbGetUsersByPage, cypherDbUpdateUserData, cypherDbDeleteUserById };