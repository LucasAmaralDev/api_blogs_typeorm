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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataCriacao: Date

    @Column({ nullable: true })
    usuarioAlteracao: string

    @Column({ type: 'timestamp', nullable: true})
    dataAlteracao: Date

}
