//import { Request, Response } from "express";
import { MinioService } from "../services/minio.service";

export class DocumentoController {
    async upload(request, response) {
        try {
            const { file } = request;

            if(!file){
                throw 'Arquivo obrigatório';
            }

            const minioService = new MinioService();

            const responseObj = await minioService.upload(file);
            
            return response.status(201).json(responseObj);

        } catch (error) {
            return response.status(500).json({
                message: error || 'Erro ao realizar upload do arquivo'
            });
        }
    }
}