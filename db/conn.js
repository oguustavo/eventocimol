const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (!sequelize) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
        pool: {
            max: 2,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}

module.exports = sequelize;
