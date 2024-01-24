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
        }
    }
};

const outputFile = 'src/swagger_output.json';

const endpointsFiles = ['src/routes/*.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.ts');
});