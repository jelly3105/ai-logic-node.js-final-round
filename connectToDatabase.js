import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

// TODO: fetch details from env file
export default function connectToDatabase() {
    const sequelize = new Sequelize({
        dialect: MySqlDialect,
        database: 'test',
        user: 'root',
        password: "taylorSwift@123",
        host: 'localhost',
        port: 3306,
    });

    console.log(`Connected to database successfully!`)

    return sequelize;
}