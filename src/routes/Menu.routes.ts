import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

const menuController = new MenuController();
const menuRouter = Router();


menuRouter.post("/menu/create", (req, res) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.summary = 'Endpoint para criar um menu'
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
            $ref: "#/definitions/Menu_unico"
         }
    }
    
    */
    menuController.create(req, res)
});
menuRouter.get("/menu/list", (req, res) => {
    /*
    #swagger.tags = ['Menu']
    #swagger.summary = 'Endpoint para listar os menus'
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
    #swagger.summary = 'Endpoint para listar os menus em formato de árvore'
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
    #swagger.summary = 'Endpoint para listar todos os menus'
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
    #swagger.summary = 'Endpoint para listar um menu'
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
menuRouter.post("/cms/menu", (req, res) => {
    /*
    #swagger.tags = ['CMS Menu']
    #swagger.summary = 'Endpoint para criar um menu'
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
            $ref: "#/definitions/Menu_unico"
         }
    }
    
    */

    menuController.create(req, res)
});
menuRouter.put("/cms/menu/:id", (req, res) => {
    /*
    
    #swagger.tags = ['CMS Menu']
    #swagger.summary = 'Endpoint para atualizar um menu'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do menu',
        type: 'integer'
    }
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados do menu',
            required: true,
            schema: {
                $ref: "#/definitions/Menu_Update"
            }
        }
    ]

    #swagger.responses[200] = {
        description: 'Menu atualizado com sucesso',
        schema: { 
            $ref: "#/definitions/Menu_unico"
         }
    }
    
    */
    menuController.update(req, res)
});


menuRouter.delete("/cms/menu/:id", (req, res) => {
    /*
    #swagger.tags = ['CMS Menu']
    #swagger.summary = 'Endpoint para deletar um menu'
    #swagger.description = 'Atenção! Ao deletar um menu, todos os menus filhos serão deletados também.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do menu',
        type: 'integer'
    }

    #swagger.responses[200] = {
        description: 'Menu deletado com sucesso',
        schema: { 
            'message': 'Menu removido com sucesso!'
         }
    }
    
    */
    menuController.delete(req, res)
});

export { menuRouter };


