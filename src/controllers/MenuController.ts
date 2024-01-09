import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Menu } from "../database/entity/Menu";
import { factoryLimparMenuEOrdenar } from "../services/factoryMenu";


const repoMenu = AppDataSource.getRepository(Menu);

export class MenuController {

    async create(request: Request, response: Response) {

        try {

            const { titulo, subtitulo, principal, subMenu, usuarioCriacao, dataCriacao, destaqueOrdem } = request.body;

            if (!titulo || !subtitulo || principal == undefined || !usuarioCriacao || destaqueOrdem) {
                return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const menu = new Menu();

            const menuExists = await repoMenu.findOne({
                where: {
                    titulo: titulo,
                    principal: true
                }
            });

            if (menuExists) {
                throw new Error('Menu já existe');
            }

            menu.titulo = titulo;
            menu.subtitulo = subtitulo;
            menu.principal = principal;
            menu.usuarioCriacao = usuarioCriacao;
            menu.dataCriacao = dataCriacao ?? new Date();
            menu.destaqueOrdem = destaqueOrdem;

            if (subMenu) {
                const subMenuExists = await repoMenu.findOne({
                    where: { id: subMenu }
                });
                menu.menu = subMenuExists;
            }

            await repoMenu.save(menu);

            return response.status(201).json({
                message: 'Menu criado com sucesso!',
            });

        } catch (error) {

            return response.status(500).json({
                message: 'Erro ao criar menu',
                error: error.message
            });
        }
    }

    async list(request: Request, response: Response) {

        try {

            const menus = await repoMenu.find();

            return response.status(200).json(menus);

        } catch (error) {


            return response.status(500).json({
                message: 'Erro ao listar menus',
                error: error.message
            });
        }
    }

    async findById(request: Request, response: Response) {

        try {

            const { id } = request.params;

            const menu = await repoMenu.findOne({
                where: { id: Number(id) }
            });

            return response.status(200).json(menu);

        } catch (error) {

            return response.status(500).json({
                message: 'Erro ao listar menu',
                error: error.message
            });

        }

    }


    async getTree(request: Request, response: Response) {

        try {
            const arvore = await AppDataSource.manager.getTreeRepository(Menu).findTrees();
            const arvoreTratada = factoryLimparMenuEOrdenar(arvore)
            return response.status(200).json(arvoreTratada);

        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }

    }

    async update(request: Request, response: Response) {

        try {

            const { id } = request.params;

            const { titulo, subtitulo, principal, subMenu, usuarioAlteracao, dataAlteracao, destaqueOrdem } = request.body;

            if (!titulo && !subtitulo && principal == undefined && !usuarioAlteracao && !destaqueOrdem) {
                return response.status(400).json({ error: 'Pelo menos um campo deve ser preenchido' });
            }

            const menu = await repoMenu.findOne({
                where: { id: Number(id) }
            });

            if (!menu) {
                return response.status(400).json({ error: 'Menu não encontrado' });
            }

            menu.titulo = titulo || menu.titulo;
            menu.subtitulo = subtitulo || menu.subtitulo;
            menu.principal = principal ?? menu.principal;
            menu.usuarioAlteracao = usuarioAlteracao || menu.usuarioAlteracao;
            menu.dataAlteracao = dataAlteracao ?? new Date();
            menu.destaqueOrdem = destaqueOrdem || menu.destaqueOrdem;

            if (subMenu) {
                const subMenuExists = await repoMenu.findOne({
                    where: { id: subMenu }
                });
                menu.menu = subMenuExists;
            }

            await repoMenu.save(menu);

            return response.status(200).json({
                message: 'Menu atualizado com sucesso!',
            });

        } catch (error) {

            return response.status(500).json({
                message: 'Erro ao atualizar menu',
                error: error.message
            });
        }

    }

    async delete(request: Request, response: Response) {

        try {

            const { id } = request.params;

            const menu = await repoMenu.findOne({
                where: { id: Number(id) }
            });

            if (!menu) {
                return response.status(400).json({ error: 'Menu não encontrado' });
            }

            await repoMenu.remove(menu);

            return response.status(200).json({
                message: 'Menu removido com sucesso!',
            });

        } catch (error) {

            return response.status(500).json({
                message: 'Erro ao remover menu',
                error: error.message
            });
        }
    }
}