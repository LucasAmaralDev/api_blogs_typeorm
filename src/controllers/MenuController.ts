import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Menu } from "../database/entity/Menu";


const repoMenu = AppDataSource.getRepository(Menu);

export class MenuController{ 

    async create(request: Request, response: Response) {

        try {

            const { titulo, subtitulo, principal, subMenu, usuarioCriacao, dataCriacao } = request.body;

            const menu = new Menu();

            const menuExists = await repoMenu.findOne({
                where: { titulo: titulo }
            });

            if (menuExists) {
                throw new Error('Menu já existe');
            }

            menu.titulo = titulo;
            menu.subtitulo = subtitulo;
            menu.principal = principal;
            menu.subMenu = subMenu ?? null;
            menu.usuarioCriacao = usuarioCriacao;
            menu.dataCriacao = dataCriacao ?? new Date();

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



}