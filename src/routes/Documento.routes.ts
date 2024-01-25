import { Router } from "express";
import { DocumentoController } from "../controllers/DocumentoController";
import * as multer from "multer";


const routesDocumento = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const documentoController = new DocumentoController();

// CMS
routesDocumento.post("/cms/documento", upload.single('arquivo'), (req, res) => {
    /*
    #swagger.tags = ['Documento CMS']
    #swagger.summary = 'Endpoint para criar um documento pelo CMS'
    #swagger.parameters = [
        {
            in: "formData",
            name: "arquivo",
            type: "file",
            required: true,
            description: "Arquivo do documento"
        }
    ]

    #swagger.responses[201] = {
        description: 'Documento criado com sucesso',
        schema: {
            "name": "arquivo.pdf",
            "url": "http://localhost:9000/bucket/arquivo.pdf",
            'contentType': 'file.mimetype',
            }
    }
    */
    documentoController.upload(req, res)

});

export { routesDocumento };