import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

const menuController = new MenuController();
const menuRouter = Router();


menuRouter.post("/menu/create", menuController.create);
menuRouter.get("/menu/list", menuController.list);
menuRouter.get("/menu/tree", menuController.getTree);

// CMS

menuRouter.get("/cms/menu", menuController.list);
menuRouter.get("/cms/menu/:id", menuController.findById);
menuRouter.post("/cms/menu", menuController.create);
menuRouter.put("/cms/menu/:id", menuController.update);
menuRouter.delete("/cms/menu/:id", menuController.delete);

export { menuRouter };


