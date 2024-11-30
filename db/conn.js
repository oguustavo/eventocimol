const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME || 'sql10748608',
    process.env.DB_USER || 'sql10748608',
    process.env.DB_PASSWORD || '7Us75d96Qr',
    {
        host: process.env.DB_HOST || 'sql10.freesqldatabase.com',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        dialectModule: require('mysql2'),
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            connectTimeout: 60000
        }
    }
)

module.exports = sequelize
