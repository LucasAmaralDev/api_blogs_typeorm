import { Router } from "express";
import { DocumentoController } from "../controllers/DocumentoController";
import * as multer from "multer";


const routesDocumento = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const documentoController = new DocumentoController();

// CMS
routesDocumento.post("/cms/documento", upload.single('arquivo'), documentoController.upload);

export { routesDocumento };