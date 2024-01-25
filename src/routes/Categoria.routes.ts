import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";


const routesCategoria = Router();

const categoriaController = new CategoriaController();

routesCategoria.post("/categoria/create", (req, res) => {
    /* 
    #swagger.tags = ['Categoria']
    #swagger.summary = 'Endpoint para criar uma categoria'
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados da categoria',
            required: true,
            schema: {
                $ref: "#/definitions/Categoria_Create"
            }
        }
    ]

    #swagger.responses[201] = {
        description: 'Categoria criada com sucesso',
        schema: { 
            $ref: "#/definitions/Categoria_unico"
         }
    }
    */
    categoriaController.create(req, res)
});
routesCategoria.get("/categoria/list", (req, res) => {
    /*
    #swagger.tags = ['Categoria']
    #swagger.summary = 'Endpoint para listar as categorias'
    #swagger.responses[200] = {
        description: 'Categorias listadas com sucesso',
        schema: { 
            $ref: "#/definitions/Categoria_List"
         }
    }
    */

    categoriaController.list(req, res)
});

// CMS

routesCategoria.get("/cms/categoria", (req, res) => {
    /*
    #swagger.tags = ['Categoria CMS']
    #swagger.summary = 'Endpoint para listar as categorias pelo CMS'
    #swagger.responses[200] = {
        description: 'Categorias listadas com sucesso',
        schema: { 
            $ref: "#/definitions/Categoria_List"
         }
    }
    */
    categoriaController.list(req, res)
});
routesCategoria.post("/cms/categoria", (req, res) => {
    /*
    #swagger.tags = ['Categoria CMS']
    #swagger.summary = 'Endpoint para criar uma categoria pelo CMS'
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados da categoria',
            required: true,
            schema: {
                $ref: "#/definitions/Categoria_Create"
            }
        }
    ]

    #swagger.responses[201] = {
        description: 'Categoria criada com sucesso',
        schema: { 
            $ref: "#/definitions/Categoria_unico"
         }
    }
    */
    categoriaController.create(req, res)
});
routesCategoria.get("/cms/categoria/:id", (req, res) => {
    /*
    #swagger.tags = ['Categoria CMS']
    #swagger.summary = 'Endpoint para listar uma categoria pelo CMS'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da categoria',
        type: 'integer'
    }

    #swagger.responses[200] = {
        description: 'Categoria listada com sucesso',
        schema: { 
            $ref: "#/definitions/Categoria_unico"
         }
    }

    #swagger.responses[500] = {
        description: 'Erro ao listar categoria',
        schema: {
            "message": "Erro ao listar categoria",
            "error": "Categoria não existe"
        }
    
    }
    */
    categoriaController.findById(req, res)
});
routesCategoria.put("/cms/categoria/:id", (req, res) => {
    /*
    #swagger.tags = ['Categoria CMS']
    #swagger.summary = 'Endpoint para atualizar uma categoria pelo CMS'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da categoria',
        type: 'integer'
    }
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados da categoria',
            required: true,
            schema: {
                $ref: "#/definitions/Categoria_Update"
            }
        }
    ]
    #swagger.responses[200] = {
        description: 'Categoria atualizada com sucesso',
        schema: { 
            $ref: "#/definitions/Categoria_unico"
         }
    }
    */

    categoriaController.update(req, res)
});

routesCategoria.delete("/cms/categoria/:id", (req, res) => {
    /*
    #swagger.tags = ['Categoria CMS']
    #swagger.summary = 'Endpoint para deletar uma categoria pelo CMS'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da categoria',
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Categoria deletada com sucesso',
        schema: { 
            'message': 'Categoria deletada com sucesso!'
         }
    }
    */
    categoriaController.delete(req, res)
});

export { routesCategoria };