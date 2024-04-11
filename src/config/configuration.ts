/**
 * Define configurations of application.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { config as dotConfig }  from 'dotenv';

dotConfig();

export const config = {
    api: {
        apiUrl: process.env.API_URL,
        port: parseInt(process.env.PORT, 10)
    },
    db: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        userName: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        dbName: process.env.POSTGRES_DATABASE
    },
    env: {
        mode: process.env.MODE
    },
    typeOrm: {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        synchronize: true,
        entities: ['../**/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['../migration/*.ts']
    }
}