const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (!global.sequelize) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: require('pg'),
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 2,
            min: 0,
            idle: 10000
        }
    });
    global.sequelize = sequelize;
} else {
    sequelize = global.sequelize;
}

module.exports = sequelize;
