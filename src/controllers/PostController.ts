import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Post } from "../database/entity/Post";

const repoPost = AppDataSource.getRepository(Post);

export class PostController {


    async create(req: Request, res: Response) {
        try {
            const { titulo, subtitulo, conteudo, autores, categoria, menu, tags, slug, destaqueOrdem, usuarioCriacao, dataCriacao, usuarioAlteracao, dataAlteracao, inicioVigencia, fimVigencia } = req.body;

            console.log(req.body)

            if (!titulo || !subtitulo || !conteudo || !autores || !slug || !destaqueOrdem || !usuarioCriacao) {
                console.log(titulo, subtitulo, conteudo, autores, slug, destaqueOrdem, usuarioCriacao)
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const post = new Post();
            post.titulo = titulo;
            post.subtitulo = subtitulo;
            post.conteudo = conteudo;
            post.autores = autores;
            post.categoria = categoria ?? null;
            post.menu = menu ?? null;
            post.tags = tags ?? null;
            post.slug = slug;
            post.destaqueOrdem = destaqueOrdem;
            post.usuarioCriacao = usuarioCriacao;
            post.dataCriacao = dataCriacao || new Date();
            post.usuarioAlteracao = usuarioAlteracao || null;
            post.dataAlteracao = dataAlteracao || null;
            post.inicioVigencia = inicioVigencia || new Date();
            post.fimVigencia = fimVigencia ?? null;


            console.log(post)

            console.log(repoPost)

            await repoPost.save(post);
            return res.status(201).json({
                message: 'Post criado com sucesso!',
            });
        } catch (error) {

            console.log(error)

            return res.status(500).json({
                message: 'Erro ao criar post',
                error
            });
        }
    }

    async list(req: Request, res: Response) {
        try {

            const postsPerPage = (req.query.postsPerPage || 10) as number;
            const page = (req.query.page || 1) as number;

            const posts = await repoPost.find({
                order: { id: 'DESC' },
                take: postsPerPage,
                skip: postsPerPage * (page - 1)
            });

            return res.status(200).json(posts);

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar posts',
                error
            });
        }
    }

    async search(req: Request, res: Response) {

        try {

            const postsPerPage = (req.query.postsPerPage || 10) as number;
            const page = (req.query.page || 1) as number;
            const titulo = (req.query.titulo || '') as string;
            const subtitulo = (req.query.subtitulo || '') as string;
            const conteudo = (req.query.conteudo || '') as string;

            const posts = await repoPost.find({
                order: { id: 'DESC' },
                where: {
                    titulo: ILike(`%${titulo}%`),
                    subtitulo: ILike(`%${subtitulo}%`),
                    conteudo: ILike(`%${conteudo}%`)
                },
                take: postsPerPage,
                skip: postsPerPage * (page - 1)
            })

            //contar total de registros
            const total = await repoPost.count({
                where: {
                    titulo: ILike(`%${titulo}%`),
                    subtitulo: ILike(`%${subtitulo}%`),
                    conteudo: ILike(`%${conteudo}%`)
                }
            });

            const totalPages = Math.ceil(total / postsPerPage);

            const response = {
                posts,
                total,
                totalPages
            }

            return res.status(200).json(response);

        } catch (error) {

            return res.status(500).json({
                message: 'Erro ao listar posts',
                error
            });

        }


    }

}