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
});

routerPost.get("/post/slug/:slug", (req, res) => {
    /*
    #swagger.tags = ['Post']
    #swagger.description = 'Endpoint para buscar o post por slug'
    #swagger.parameters['slug'] = {
        in: 'path',
        description: 'Slug do post',
        type: 'string',
        default: 'teste'
    }

    #swagger.responses[200] = {
        description: 'Post encontrado com sucesso',
        schema: { 
            $ref: "#/definitions/Post_Slug"
         }
    }

    #swagger.responses[404] = {
        description: 'Post não encontrado',
        schema: {
            error: "Post não encontrado"
        }
    }
    */
    postController.findBySlug(req, res)
});


// CMS
routerPost.get("/cms/post", (req, res) => {
    /*
    #swagger.tags = ['CMS Post']
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
routerPost.post("/cms/post", (req, res) => {
    /* 
    
    #swagger.tags = ['CMS Post']
    #swagger.description = 'Endpoint para criar um post'
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados do post',
            required: true,
            schema: {
                $ref: "#/definitions/Post_Create"
            }
        }
    ]
    #swagger.responses[200] = {
        description: 'Post criado com sucesso',
        schema: { 
            $ref: "#/definitions/Post_Create_Response"
         }
    }

    
    */
    postController.create(req, res)
});
routerPost.get("/cms/post/:id", (req, res) => {
    /* 
    #swagger.tags = ['CMS Post']
    #swagger.description = 'Endpoint para buscar o post por id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Id do post',
        type: 'integer'
    }

    #swagger.responses[200] = {
        description: 'Post encontrado com sucesso',
        schema: { 
            $ref: "#/definitions/Post_Slug"
         }
    }
    
    */
    postController.findById(req, res)
});
routerPost.put("/cms/post/:id", (req, res) => {
    /*
    #swagger.tags = ['CMS Post']
    #swagger.description = 'Endpoint para atualizar um post'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Id do post',
        type: 'integer'
    }
    #swagger.parameters = [
        {
            in: 'body',
            name: 'body',
            description: 'Dados do post',
            required: true,
            schema: {
                $ref: "#/definitions/Post_Create"
            }
        }
    ]
    */
    postController.update(req, res)
});

routerPost.delete("/cms/post/:id", (req, res) => {
    /*
    #swagger.tags = ['CMS Post']

    #swagger.description = 'Endpoint para deletar um post'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Id do post',
        type: 'integer'
    }


    #swagger.responses[200] = {
        description: 'Post deletado com sucesso',
        schema: { 
            "message": "Post deletado com sucesso!"
         }
    }

    #swagger.responses[404] = {
        description: 'Post não encontrado',
        schema: {
            error: "Post não encontrado"
        }
    }

    */
    postController.delete(req, res)
});


export { routerPost };