import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "./Categoria"
import { Menu } from "./Menu"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    subtitulo: string

    @Column({ nullable: true })
    urlImagemPrincipal: string

    @Column({ nullable: true })
    altUrlImagemPrincipal: string

    @Column()
    conteudo: string

    @Column()
    autores: string

    @ManyToOne(() => Categoria, categoria => categoria.id, { nullable: true })
    @JoinColumn({ name: "categoria" })
    categoria: Categoria

    @ManyToOne(() => Menu, menu => menu.id, { nullable: true })
    @JoinColumn({ name: "menu" })
    menu: Menu;

    @Column({ nullable: true })
    tags: string

    @Column({ unique: true })
    slug: string

    @Column()
    destaqueOrdem: number

    @Column()
    usuarioCriacao: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    dataCriacao: Date

    @Column({ nullable: true })
    usuarioAlteracao: string

    @Column({ nullable: true })
    dataAlteracao: Date

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    inicioVigencia: Date

    @Column({ nullable: true})
    fimVigencia: Date

}
