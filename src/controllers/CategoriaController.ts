import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Categoria } from "../database/entity/Categoria";

const repoCategoria = AppDataSource.getRepository(Categoria);

export class CategoriaController {
    async create(request: Request, response: Response) {

        try {

            const { titulo, subtitulo, usuarioCriacao, dataCriacao } = request.body;

            const categoria = new Categoria();

            const categoriaExists = await repoCategoria.findOne({
                where: { titulo: titulo }
            });

            if (categoriaExists) {
                throw new Error('Categoria já existe');
            }

            categoria.titulo = titulo;
            categoria.subtitulo = subtitulo;
            categoria.usuarioCriacao = usuarioCriacao;
            categoria.dataCriacao = dataCriacao ?? new Date();

            await repoCategoria.save(categoria);

            return response.status(201).json({
                message: 'Categoria criada com sucesso!',
            });

        } catch (error) {

            return response.status(500).json({
                message: 'Erro ao criar categoria',
                error: error.message
            });
        }
    }

    async list(request: Request, response: Response) {

        try {

            const categorias = await repoCategoria.find();

            return response.status(200).json(categorias);

        } catch (error) {

            

            return response.status(500).json({
                message: 'Erro ao listar categorias',
                error: error.message
            });
        }
    }
}