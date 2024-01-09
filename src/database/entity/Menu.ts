import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, TreeChildren, TreeParent, Tree, OneToMany } from "typeorm"

@Entity()
@Tree("closure-table")
export class Menu {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    subtitulo: string

    @Column()
    principal: boolean

    @Column({ nullable: true })
    destaqueOrdem: number

    @Column()
    usuarioCriacao: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataCriacao: Date

    @Column({ nullable: true })
    usuarioAlteracao: string

    @Column({ type: 'timestamp', nullable: true})
    dataAlteracao: Date

    @TreeChildren()
    subMenu: Menu[]

    @TreeParent()
    menu: Menu
}
