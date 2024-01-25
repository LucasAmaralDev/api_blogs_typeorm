import { Request, Response } from "express";
import { ILike, Not } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Post } from "../database/entity/Post";
import { createPost, updatePost } from "../models/Post.model";
import { CamposAusentes } from "../services/ToolPosts.service";

const listaCache = ["posts", "ultimasNoticias"];

const repoPost = AppDataSource.getRepository(Post);

export class PostController {

    async create(req: Request, res: Response) {
        try {
            const { titulo, subtitulo, urlImagemPrincipal, altUrlImagemPrincipal, legendaUrlImagemPrincipal, conteudo, autores, categoria, menu, tags, slug, destaqueOrdem, usuarioCriacao, inicioVigencia, fimVigencia, anexo, status } = req.body;

            if (!titulo || !subtitulo || !conteudo || !autores || !slug || !usuarioCriacao || !status) {
                const camposAusentes = CamposAusentes({ titulo, subtitulo, conteudo, autores, slug, usuarioCriacao, status });
                return res.status(400).json({ error: 'Campos Ausentes: ' + camposAusentes });
            }

            const slugExists = await repoPost.findOne({
                where: { slug: slug }
            });

            if (slugExists) {
                return res.status(400).json({ error: 'Slug já existe' });
            }



            const post = createPost({
                titulo, subtitulo, urlImagemPrincipal, altUrlImagemPrincipal, legendaUrlImagemPrincipal, conteudo, autores, categoria,
                menu, tags, slug, destaqueOrdem, usuarioCriacao, inicioVigencia, fimVigencia, anexo, status
            });

            await repoPost.save(post);
            await AppDataSource.queryResultCache.remove(["posts"]);
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

            const cacheId = `posts-${page}-${postsPerPage}`;

            const posts = await repoPost.find({
                where: { status: Not('INATIVO') },
                order: { dataCriacao: 'DESC' },
                take: postsPerPage,
                skip: postsPerPage * (page - 1),
                cache: {
                    id: cacheId,
                    milliseconds: 120000
                }
            });

            listaCache.push(cacheId);

            const totalElements = await repoPost.count({
                where: { status: Not('INATIVO') }
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

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const cacheId = `posts-${id}`;

            const post = await repoPost.findOne({
                relations: ["categoria", "menu"],
                where: {
                    id: Number(id),
                    status: Not('INATIVO')
                },
                cache: {
                    id: cacheId,
                    milliseconds: 120000
                },
            });

            listaCache.push(cacheId);

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
            const { titulo, subtitulo, urlImagemPrincipal, altUrlImagemPrincipal, legendaUrlImagemPrincipal, conteudo, autores, categoria, menu, tags, slug, destaqueOrdem, usuarioAlteracao, dataAlteracao, inicioVigencia, fimVigencia, status, anexo } = req.body;
            if (!titulo && !subtitulo && !conteudo && !autores && !slug && !destaqueOrdem && !usuarioAlteracao && !status && !inicioVigencia && !fimVigencia && !anexo && !urlImagemPrincipal && !altUrlImagemPrincipal && !legendaUrlImagemPrincipal && !categoria && !menu && !tags) {
                return res.status(400).json({ error: 'Pelo menos um campo deve ser preenchido' });
            }

            const post = await updatePost({ id: Number(id), titulo, subtitulo, urlImagemPrincipal, altUrlImagemPrincipal, legendaUrlImagemPrincipal, conteudo, autores, categoria, menu, tags, slug, destaqueOrdem, usuarioAlteracao, dataAlteracao, inicioVigencia, fimVigencia, anexo, status });

            await repoPost.save(post);

            await AppDataSource.queryResultCache.remove(listaCache);

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

            console.log(titulo, subtitulo, conteudo)

            const cacheId = `posts-${titulo}-${subtitulo}-${conteudo}-${page}-${postsPerPage}`;

            const posts = await repoPost.find({
                order: { dataCriacao: 'DESC' },
                where: {
                    titulo: ILike(`%${titulo}%`),
                    subtitulo: ILike(`%${subtitulo}%`),
                    conteudo: ILike(`%${conteudo}%`),
                    status: Not('INATIVO')
                },
                take: postsPerPage,
                skip: postsPerPage * (page - 1),
                cache: {
                    id: cacheId,
                    milliseconds: 120000
                }
            })

            listaCache.push(cacheId);

            //contar total de registros
            const totalElements = await repoPost.count({
                where: {
                    titulo: ILike(`%${titulo}%`),
                    subtitulo: ILike(`%${subtitulo}%`),
                    conteudo: ILike(`%${conteudo}%`)
                },
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
            const cacheId = `ultimasNoticias-${page}-${postsPerPage}`;

            const posts = await repoPost.find({
                order: {
                    destaqueOrdem: 'DESC',
                    dataAlteracao: "DESC"
                },
                take: postsPerPage,
                skip: postsPerPage * (page - 1),
                where: { status: Not('INATIVO') },
                cache: {
                    id: cacheId,
                    milliseconds: 12000
                }
            })
            const totalElements = await repoPost.count();
            const totalPages = Math.ceil(totalElements / postsPerPage);
            listaCache.push(cacheId);

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
                return res.status(404).json({ error: 'Post não encontrado' });
            }

            post.status = 'INATIVO';

            await repoPost.save(post);

            await AppDataSource.queryResultCache.remove(["posts"]);

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

            const cacheId = `posts-${slug}`;

            const post = await repoPost.findOne({
                where: { slug: slug },
                relations: ["categoria", "menu"],
                cache: {
                    id: cacheId,
                    milliseconds: 120000
                }
            });

            listaCache.push(cacheId);

            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
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