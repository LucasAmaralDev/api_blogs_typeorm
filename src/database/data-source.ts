import "reflect-metadata"
import { DataSource } from "typeorm"
import { Categoria } from "./entity/Categoria"
import { Menu } from "./entity/Menu"
import { Post } from "./entity/Post"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "144.22.197.0",
    port: 5432,
    username: "postgres",
    password: "@Luc97ari",
    database: "api_blog",
    synchronize: true,
    logging: false,
    entities: [Categoria, Menu, Post],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Conectado com sucesso!")
    })
    .catch((error) => {
        console.log("Erro ao conectar com o banco de dados!")
        console.log(error)
    }
)

export { AppDataSource }
