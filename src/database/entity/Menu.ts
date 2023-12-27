import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    subtitulo: string

    @Column()
    principal: boolean

    @ManyToOne(() => Menu, menu => menu.id, { nullable: true })
    @JoinColumn({ name: "subMenu" })
    subMenu: Menu;

    @Column()
    usuarioCriacao: string

    @Column()
    dataCriacao: Date

    @Column()
    usuarioAlteracao: string

    @Column()
    dataAlteracao: Date

}
