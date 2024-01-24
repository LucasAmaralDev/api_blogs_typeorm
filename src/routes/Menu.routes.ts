import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

const menuController = new MenuController();
const menuRouter = Router();


menuRouter.post("/menu/create", (req, res) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.description = 'Endpoint para criar um menu'
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados do menu',
            required: true,
            schema: {
                $ref: "#/definitions/Menu_Create"
            }
        }
    ]

    #swagger.responses[201] = {
        description: 'Menu criado com sucesso',
        schema: { 
            "message": "Menu criado com sucesso!"
         }
    }
    
    */
    menuController.create(req, res)
});
menuRouter.get("/menu/list", (req, res) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.description = 'Endpoint para listar os menus'
    #swagger.responses[200] = {
        description: 'Menus listados com sucesso',
        schema: { 
            $ref: "#/definitions/Menu_List"
         }
    }
    */
    menuController.list(req, res)
});
menuRouter.get("/menu/tree", (req, res) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.description = 'Endpoint para listar os menus em formato de árvore'
    #swagger.responses[200] = {
        description: 'Menus listados com sucesso',
        schema: { 
            $ref: "#/definitions/Menu_Tree"
         }
    }
    */
    menuController.getTree(req, res)
});

// CMS

menuRouter.get("/cms/menu", (req, res) => {
    /*
    #swagger.tags = ['CMS Menu']
    #swagger.description = 'Endpoint para listar todos os menus'
     #swagger.responses[200] = {
        description: 'Menus listados com sucesso',
        schema: { 
            $ref: "#/definitions/Menu_List"
         }
    }
    */
    menuController.list(req, res)
});
menuRouter.get("/cms/menu/:id", (req, res) => {
    /*
    #swagger.tags = ['CMS Menu']
    #swagger.description = 'Endpoint para listar um menu'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do menu',
        type: 'integer',
        default: 1
    }

    #swagger.responses[200] = {
        description: 'Menu listado com sucesso',
        schema: { 
            $ref: "#/definitions/Menu_unico"
         }}
     */
    menuController.findById(req, res)
});
menuRouter.post("/cms/menu", menuController.create);
menuRouter.put("/cms/menu/:id", menuController.update);
menuRouter.delete("/cms/menu/:id", menuController.delete);

export { menuRouter };


