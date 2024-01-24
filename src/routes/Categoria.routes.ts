import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";


const routesCategoria = Router();

const categoriaController = new CategoriaController();

routesCategoria.post("/categoria/create", categoriaController.create);
routesCategoria.get("/categoria/list", categoriaController.list);

// CMS

routesCategoria.get("/cms/categoria", categoriaController.list);
routesCategoria.post("/cms/categoria", categoriaController.create);
routesCategoria.get("/cms/categoria/:id", categoriaController.findById);
routesCategoria.put("/cms/categoria/:id", categoriaController.update);
routesCategoria.delete("/cms/categoria/:id", categoriaController.delete);

export { routesCategoria };