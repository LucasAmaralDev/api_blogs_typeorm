import { AppDataSource } from "../database/data-source";
import { Post } from "../database/entity/Post";

interface PostModel {
    id?: number;
    titulo?: string;
    subtitulo?: string;
    urlImagemPrincipal?: string;
    altUrlImagemPrincipal?: string;
    legendaUrlImagemPrincipal?: string;
    conteudo?: string;
    autores?: string;
    categoria?: number;
    menu?: number;
    tags?: string;
    slug?: string;
    destaqueOrdem?: number;
    usuarioCriacao?: string;
    dataCriacao?: Date;
    usuarioAlteracao?: string;
    dataAlteracao?: Date;
    anexo?: string;
    status?: string;
    inicioVigencia?: Date;
    fimVigencia?: Date;
}

const repoPost = AppDataSource.getRepository(Post); 

export function createPost(dados:PostModel){
    const post = new Post();
    Object.assign(post, dados);
    return post;
}

export async function updatePost(dados:PostModel){
    const post = await repoPost.findOne({
        where: { id: dados.id }
    })

    if (!post) {
        throw new Error('Post não existe');
    }

    Object.keys(dados).forEach((key) => {
        if (dados[key] !== undefined || dados[key] !== null) {
            post[key] = dados[key];
        }
    })

    return post;
}