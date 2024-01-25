const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'API Blog Typeorm',
        description: 'Documentação da API BLOG TYPEORM',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    definitions: {
        Post: {
            "posts": [
                {
                    "id": "string",
                    "titulo": "string",
                    "subtitulo": "string",
                    "urlImagemPrincipal": "string",
                    "altUrlImagemPrincipal": "string",
                    "legendaUrlImagemPrincipal": "string",
                    "conteudo": "string",
                    "autores": "string",
                    "tags": "string",
                    "slug": "string",
                    "destaqueOrdem": "string",
                    "usuarioCriacao": "string",
                    "dataCriacao": "string",
                    "usuarioAlteracao": "string",
                    "dataAlteracao": "string",
                    "anexo": "string",
                    "status": "string",
                    "inicioVigencia": "string",
                    "fimVigencia": "string",
                },

            ],
            "page": {
                "size": 10,
                "currentPage": 1,
                "totalElements": 100,
                "totalPages": 10,
            }
        },
        Post_Slug: {
            "id": 56,
            "titulo": "teste",
            "subtitulo": "teste",
            "urlImagemPrincipal": "http://minio.desenv.cge.mt.gov.br:9010/porta-cge/cge-apresenta-instrumentos-de-transparencia-e-controle.jpeg",
            "altUrlImagemPrincipal": "teste",
            "legendaUrlImagemPrincipal": "etste",
            "conteudo": "<p>teste</p>",
            "autores": "asdfa",
            "tags": "teste",
            "slug": "teste",
            "destaqueOrdem": 3,
            "usuarioCriacao": "afsdf",
            "dataCriacao": "2024-01-16T21:48:15.512Z",
            "usuarioAlteracao": null,
            "dataAlteracao": null,
            "anexo": null,
            "status": "RASCUNHO",
            "inicioVigencia": "2024-01-16T21:48:15.512Z",
            "fimVigencia": null,
            "categoria": {
                "id": 4,
                "titulo": "Categoria 2",
                "subtitulo": "Essa é a segunda categoria",
                "usuarioCriacao": "Lucas Henrique",
                "dataCriacao": "2023-12-28T11:40:30.240Z",
                "usuarioAlteracao": null,
                "dataAlteracao": null
            },
            "menu": {
                "id": 62,
                "titulo": "Vídeos e Áudios",
                "subtitulo": "Página de Vídeos e Áudios",
                "principal": true,
                "destaqueOrdem": null,
                "usuarioCriacao": "Jonathan",
                "dataCriacao": "2024-01-05T21:15:20.365Z",
                "usuarioAlteracao": null,
                "dataAlteracao": null
            }
        },
        Post_Create: {
            titulo: "swagger-titulo",
            subtitulo: "swagger-titulo",
            urlImagemPrincipal: "swagger-titulo",
            altUrlImagemPrincipal: "swagger-titulo",
            legendaUrlImagemPrincipal: "swagger-titulo",
            conteudo: "swagger-titulo",
            autores: "swagger-titulo",
            categoria: 1,
            menu: 56,
            tags: "swagger-titulo",
            slug: "swagger-titulo",
            destaqueOrdem: 1,
            usuarioCriacao: "swagger-titulo",
            anexo: "swagger-titulo",
            status: "swagger-titulo",
        },
        Post_Create_Response: {
            "titulo": "swagger-titulo",
            "subtitulo": "swagger-titulo",
            "urlImagemPrincipal": "swagger-titulo",
            "altUrlImagemPrincipal": "swagger-titulo",
            "legendaUrlImagemPrincipal": "swagger-titulo",
            "conteudo": "swagger-titulo",
            "autores": "swagger-titulo",
            "categoria": 1,
            "menu": 56,
            "tags": "swagger-titulo",
            "slug": "swagger-titulo",
            "destaqueOrdem": 1,
            "usuarioCriacao": "swagger-titulo",
            "inicioVigencia": "2024-01-24T19:55:11.849Z",
            "fimVigencia": null,
            "anexo": "swagger-titulo",
            "status": "swagger-titulo",
            "usuarioAlteracao": null,
            "dataAlteracao": null,
            "id": 72,
            "dataCriacao": "2024-01-24T19:55:11.849Z"
        },
        Menu_Create: {
            titulo: "swagger-titulo",
            subtitulo: "swagger-titulo",
            principal: true,
            destaqueOrdem: 1,
            usuarioCriacao: "swagger-titulo",
            subMenu: 60,
        },
        Menu_List: [{
            "id": 56,
            "titulo": "Fotos",
            "subtitulo": "Página de Fotos",
            "principal": true,
            "destaqueOrdem": null,
            "usuarioCriacao": "Swagger",
            "dataCriacao": "2024-01-05T21:11:47.906Z",
            "usuarioAlteracao": null,
            "dataAlteracao": null

        }, {
            "id": 55,
            "titulo": "Fotos",
            "subtitulo": "Página de Fotos",
            "principal": true,
            "destaqueOrdem": null,
            "usuarioCriacao": "Swagger",
            "dataCriacao": "2024-01-05T21:11:47.906Z",
            "usuarioAlteracao": null,
            "dataAlteracao": null

        }],
        Menu_Tree: [
            {
                "id": 66,
                "titulo": "Fale Cidadão",
                "subtitulo": "Página do Fale Cidadão",
                "subMenu": []
            }
        ],
        Menu_unico: {
            "id": 60,
            "titulo": "Artigos",
            "subtitulo": "Página de Artigos",
            "principal": true,
            "destaqueOrdem": null,
            "usuarioCriacao": "Jonathan",
            "dataCriacao": "2024-01-05T21:12:03.400Z",
            "usuarioAlteracao": null,
            "dataAlteracao": null
        },
        Menu_Update: {
            titulo: "swagger-titulo",
            subtitulo: "swagger-titulo",
            principal: true,
            destaqueOrdem: 1,
            usuarioCriacao: "swagger-titulo",
            subMenu: 60,
        },
        Categoria_Create: {
            titulo: "swagger-titulo",
            subtitulo: "swagger-titulo",
            usuarioCriacao: "swagger-titulo",
        },
        Categoria_unico: {
            "id": 5,
            "titulo": "Referência",
            "subtitulo": "A CGE é Referência",
            "usuarioCriacao": "Jonathan",
            "dataCriacao": "2024-01-10T21:19:12.489Z",
            "usuarioAlteracao": null,
            "dataAlteracao": null
        },
        Categoria_List: [{
            "id": 5,
            "titulo": "Referência",
            "subtitulo": "A CGE é Referência",
            "usuarioCriacao": "Jonathan",
            "dataCriacao": "2024-01-10T21:19:12.489Z",
            "usuarioAlteracao": null,
            "dataAlteracao": null
        }],
        Categoria_Update: {
            titulo: "swagger-titulo",
            subtitulo: "swagger-titulo",
            usuarioAlteracao: "swagger-titulo",
        },
    }
};

const outputFile = 'src/swagger_output.json';

const endpointsFiles = ['src/routes/*.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.ts');
});