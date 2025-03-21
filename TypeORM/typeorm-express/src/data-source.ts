import "reflect-metadata"
import { DataSource } from "typeorm"
import { Flight } from "./entity/Flight"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Patlu@8110",
    database: "Airport",
    synchronize: true,
    logging: true,
    entities: [`${process.cwd()}/src/entity/*.ts`],
    migrations: [`${process.cwd()}/src/migration/*.ts`],
})
