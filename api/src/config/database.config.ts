import { CustomerModel } from "@/infra/db/models/customer"
import { Sequelize } from "sequelize-typescript"

const env = process.env.NODE_ENV || 'development'

const getDatabaseConfig = () => {
    const commonConfig = {
        models: [CustomerModel],
    }

    const config = {
        development: {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
        },
        test: {
            dialect: 'sqlite',
            storage: ':memory:'
        },
        production: {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME
        },
    }

    return {
        ...commonConfig,
        ...config[env]
    }
}

export const sequelize = new Sequelize(getDatabaseConfig())
