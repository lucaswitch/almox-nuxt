import {Sequelize} from "sequelize";

// @ts-nocheck
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    port: process.env.MYSQL_PORT,
    additional: {
        timestamps: false,
    },
    define: {
        timestamps: false,
    },
    use_env_variable: false,
});
