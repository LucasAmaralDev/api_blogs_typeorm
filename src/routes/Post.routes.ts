import { Router } from "express";
import { PostController } from "../controllers/PostController";

const postController = new PostController();

const routerPost = Router();

routerPost.get("/post/list", (req, res) => {
    /*  
    #swagger.tags = ['Post']
    #swagger.description = 'Endpoint para listar todos os posts'
    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número da página',
        type: 'integer',
        default: 1
    } 
    #swagger.parameters['postsPerPage'] = {
        in: 'query',
        description: 'Número de posts por página',
        type: 'integer',
        default: 10
    }
    
    
    #swagger.responses[200] = {
        description: 'Posts listados com sucesso',
        schema: { 
            $ref: "#/definitions/Post"
         }
    }
    
    */
    postController.list(req, res)
});

routerPost.get("/post/search", (req, res) => {
    /*
    #swagger.tags = ['Post']
    #swagger.description = 'Endpoint para buscar posts'
    #swagger.parameters['postsPerPage] = {
        in: 'query',
        description: 'Número de posts por página',
        type: 'integer',
        default: 10
    },
    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número da página',
        type: 'integer',
        default: 1
    },
    #swagger.parameters['titulo'] = {
        in: 'query',
        description: 'Título do post',
        type: 'string'
    },
    #swagger.parameters['subtitulo'] = {
        in: 'query',
        description: 'Subtítulo do post',
        type: 'string'
    },
    #swagger.parameters['conteudo'] = {
        in: 'query',
        description: 'Conteudo do post',
        type: 'string'
    },

    #swagger.responses[200] = {
        description: 'Posts listados com sucesso',
        schema: { 
            $ref: "#/definitions/Post"
         }
    }
    */
    postController.search(req, res)
});

routerPost.get("/post/ultimas-noticias", (req, res) => {
    /* 
    #swagger.tags = ['Post']
    #swagger.description = 'Endpoint para listar as últimas notícias'
    #swagger.parameters['postsPerPage] = {
        in: 'query',
        description: 'Número de posts por página',
        type: 'integer',
        default: 10
    },
    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número da página',
        type: 'integer',
        default: 1
    },

    #swagger.responses[200] = {
        description: 'Posts listados com sucesso',
        schema: { 
            $ref: "#/definitions/Post"
         }
    }
    
    */

    postController.ultimasNoticias(req, res)
} );
routerPost.get("/post/slug/:slug", postController.findBySlug);


// CMS
routerPost.get("/cms/post", postController.list);
routerPost.post("/cms/post", postController.create);
routerPost.get("/cms/post/:id", postController.findById);
routerPost.put("/cms/post/:id", postController.update);
routerPost.delete("/cms/post/:id", postController.delete);


export { routerPost };