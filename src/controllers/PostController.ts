import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Post } from "../database/entity/Post";

const repoPost = AppDataSource.getRepository(Post);

export class PostController {

    async create(req: Request, res: Response) {
        try {
            const { titulo, subtitulo, urlImagemPrincipal, altUrlImagemPrincipal, legendaUrlImagemPrincipal, conteudo, autores, categoria, menu, tags, slug, destaqueOrdem, usuarioCriacao, dataCriacao, usuarioAlteracao, dataAlteracao, inicioVigencia, fimVigencia } = req.body;

            console.log(req.body)

            if (!titulo || !subtitulo || !conteudo || !autores || !slug || !destaqueOrdem || !usuarioCriacao) {
                console.log(titulo, subtitulo, conteudo, autores, slug, destaqueOrdem, usuarioCriacao)
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const post = new Post();
            post.titulo = titulo;
            post.subtitulo = subtitulo;
            post.urlImagemPrincipal = urlImagemPrincipal;
            post.altUrlImagemPrincipal = altUrlImagemPrincipal;
            post.legendaUrlImagemPrincipal = legendaUrlImagemPrincipal;
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

            await repoPost.save(post);
            return res.status(201).json(post);
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
                order: { dataCriacao: 'DESC' },
                take: postsPerPage,
                skip: postsPerPage * (page - 1)
            });

            const totalElements = await repoPost.count();

            const totalPages = Math.ceil(totalElements / postsPerPage);

            const response = {
                posts,
                page: {
                    size: postsPerPage,
                    currentPage: page,
                    totalElements: totalElements,
                    totalPages: totalPages
                } 
            }

            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar posts',
                error
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const post = await repoPost.findOne({
                where: { id: Number(id) }
            });

            if (!post) {
                return res.status(400).json({ error: 'Post não encontrado' });
            }

            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar post',
                error
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, subtitulo, conteudo, autores, categoria, menu, tags, slug, destaqueOrdem, usuarioAlteracao, dataAlteracao, inicioVigencia, fimVigencia } = req.body;

            if (!titulo && !subtitulo && !conteudo && !autores && !slug && !destaqueOrdem && !usuarioAlteracao) {
                return res.status(400).json({ error: 'Pelo menos um campo deve ser preenchido' });
            }

            const post = await repoPost.findOne({
                where: { id: Number(id) }
            });

            if (!post) {
                return res.status(400).json({ error: 'Post não encontrado' });
            }

            post.titulo = titulo || post.titulo;
            post.subtitulo = subtitulo || post.subtitulo;
            post.conteudo = conteudo || post.conteudo;
            post.autores = autores || post.autores;
            post.categoria = categoria || post.categoria;
            post.menu = menu || post.menu;
            post.tags = tags || post.tags;
            post.slug = slug || post.slug;
            post.destaqueOrdem = destaqueOrdem || post.destaqueOrdem;
            post.usuarioAlteracao = usuarioAlteracao;
            post.dataAlteracao = dataAlteracao ?? new Date();
            post.inicioVigencia = inicioVigencia || post.inicioVigencia;
            post.fimVigencia = fimVigencia || post.fimVigencia;

            await repoPost.save(post);

            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar post',
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
                order: { dataCriacao: 'DESC' },
                where: {
                    titulo: ILike(`%${titulo}%`),
                    subtitulo: ILike(`%${subtitulo}%`),
                    conteudo: ILike(`%${conteudo}%`)
                },
                take: postsPerPage,
                skip: postsPerPage * (page - 1)
            })

            //contar total de registros
            const totalElements = await repoPost.count({
                where: {
                    titulo: ILike(`%${titulo}%`),
                    subtitulo: ILike(`%${subtitulo}%`),
                    conteudo: ILike(`%${conteudo}%`)
                }
            });

            const totalPages = Math.ceil(totalElements / postsPerPage);

            const response = {
                posts,
                page: {
                    size: postsPerPage,
                    currentPage: page,
                    totalElements: totalElements,
                    totalPages: totalPages
                } 
            }

            return res.status(200).json(response);

        } catch (error) {

            return res.status(500).json({
                message: 'Erro ao listar posts',
                error
            });
        }
    }

    async ultimasNoticias(req: Request, res: Response) {

        try {
            const postsPerPage = (req.query.postsPerPage || 10) as number;
            const page = (req.query.page || 1) as number;

            const posts = await repoPost.find({
                order: { 
                    destaqueOrdem: 'DESC',
                    dataAlteracao: "DESC" 
            },
                take: postsPerPage,
                skip: postsPerPage * (page - 1)
            })
            const totalElements = await repoPost.count();
            const totalPages = Math.ceil(totalElements / postsPerPage);

            const response = {
                posts,
                page: {
                    size: postsPerPage,
                    currentPage: page,
                    totalElements: totalElements,
                    totalPages: totalPages
                } 
            }

            return res.status(200).json(response);

        } catch (error) {

            return res.status(500).json({
                message: 'Erro ao listar posts',
                error
            });
        }

    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const post = await repoPost.findOne({
                where: { id: Number(id) }
            });

            if (!post) {
                return res.status(400).json({ error: 'Post não encontrado' });
            }

            await repoPost.remove(post);

            return res.status(200).json({
                message: 'Post deletado com sucesso!',
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao deletar post',
                error
            });
        }
    }

    async findBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;

            const post = await repoPost.findOne({
                where: { slug: slug },
                relations: ["categoria", "menu"]
            });

            if (!post) {
                return res.status(400).json({ error: 'Post não encontrado' });
            }

            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar post',
                error
            });
        }
    }
}