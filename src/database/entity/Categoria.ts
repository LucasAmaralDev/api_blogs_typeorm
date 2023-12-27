import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    subtitulo: string

    @Column()
    usuarioCriacao: string

    @Column()
    dataCriacao: Date

    @Column()
    usuarioAlteracao: string

    @Column()
    dataAlteracao: Date

}
