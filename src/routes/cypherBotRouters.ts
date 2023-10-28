import { Router } from "express";
import { ianBotController } from "../controllers/ianBotController";
import { cypherDbDeleteUserById, cypherDbGetUsersByPage, cypherDbSaveUserKey, cypherDbUpdateUserData } from "../database/cypher-bot/cypherQuerys";

const routerCypher = Router();

routerCypher.get("/users/get-all-users", async (req,res) =>{
    console.log("Obteniendo Usuarios...")
    const page = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.items) || 1000;
    const state = String(req.query.state)
    let users = await cypherDbGetUsersByPage(page, itemsPerPage,state);
    console.log(users)
    res.status(200).json(users)
});

routerCypher.post("/users/save-user-key", async (req,res) =>{
    const username = String(req.body.username)
    const key = String(req.body.key);
    console.log(`Guardando Usuario ${username} de Key: ${key}`)
    let result = await cypherDbSaveUserKey(username,key);
    console.log(result)
    res.status(200).json(result)
});

routerCypher.put("/users/update-user/:id", async (req,res) =>{
    const id = Number(req.params.id)
    const username = String(req.body.username)
    const key = String(req.body.key);
    const state = String(req.body.state);
    console.log(`Modificando Usuario ${username} - Nueva data: ${JSON.stringify(req.body)}`)
    let result = await cypherDbUpdateUserData(username,key,state,id);
    console.log(result)
    res.status(200).json(result)
});

routerCypher.delete("/users/delete-user/:id", async (req, res) => {
    const id = Number(req.params.id);
    let result = await cypherDbDeleteUserById(id);
    console.log(`Borrando Usuario de id ${id}`)
    console.log(result);
    res.status(200).json(result);
});



export { routerCypher };
