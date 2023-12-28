import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";


const routesCategoria = Router();

const categoriaController = new CategoriaController();

routesCategoria.post("/categoria/create", categoriaController.create);
routesCategoria.get("/categoria/list", categoriaController.list);

export { routesCategoria };