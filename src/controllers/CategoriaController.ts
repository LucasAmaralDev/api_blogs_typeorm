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

            await AppDataSource.queryResultCache?.remove(['categorias']);

            return response.status(201).json(categoria);

        } catch (error) {

            return response.status(500).json({
                message: 'Erro ao criar categoria',
                error: error.message
            });
        }
    }

    async list(request: Request, response: Response) {

        try {

            const categorias = await repoCategoria.find({
                cache: {
                    id: 'categorias',
                    milliseconds: 600000
                }
            });
            return response.status(200).json(categorias);

        } catch (error) {
            return response.status(500).json({
                message: 'Erro ao listar categorias',
                error: error.message
            });
        }
    }

    async findById(request: Request, response: Response) {

        try {

            const { id } = request.params;

            const categoria = await repoCategoria.findOne({
                where: { id: Number(id) },
                cache: {
                    id: 'categoria',
                    milliseconds: 600000
                }
            });

            return response.status(200).json(categoria);

        } catch (error) {

            

            return response.status(500).json({
                message: 'Erro ao listar categoria',
                error: error.message
            });
        }

    }

    async update(request: Request, response: Response) {

        try {

            const { id } = request.params;

            const { titulo, subtitulo, usuarioAlteracao, dataAlteracao } = request.body;

            if (!titulo && !subtitulo && !usuarioAlteracao) {
                throw new Error('Pelo menos um campo deve ser preenchido');
            }

            const categoria = await repoCategoria.findOne({
                where: { id: Number(id) }
            });

            if (!categoria) {
                throw new Error('Categoria não existe');
            }

            categoria.titulo = titulo;
            categoria.subtitulo = subtitulo;
            categoria.usuarioAlteracao = usuarioAlteracao;
            categoria.dataAlteracao = dataAlteracao ?? new Date();

            await repoCategoria.save(categoria);

            await AppDataSource.queryResultCache.remove(['categoria']);

            return response.status(200).json(categoria);

        } catch (error) {

            

            return response.status(500).json({
                message: 'Erro ao atualizar categoria',
                error: error.message
            });
        }

    }

    async delete(request: Request, response: Response) {

        try {

            const { id } = request.params;

            const categoria = await repoCategoria.findOne({
                where: { id: Number(id) }
            });

            if (!categoria) {
                throw new Error('Categoria não existe');
            }

            await repoCategoria.delete(categoria);

            await AppDataSource.queryResultCache.remove(['categoria']);

            return response.status(200).json({
                message: 'Categoria deletada com sucesso!',
            });

        } catch (error) {
            return response.status(500).json({
                message: 'Erro ao deletar categoria',
                error: error.message
            });
        }

    }
}