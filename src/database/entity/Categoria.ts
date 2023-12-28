import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    titulo: string

    @Column()
    subtitulo: string

    @Column()
    usuarioCriacao: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    dataCriacao: Date

    @Column({ nullable: true})
    usuarioAlteracao: string

    @Column({ type: 'timestamp', nullable: true})
    dataAlteracao: Date

}
