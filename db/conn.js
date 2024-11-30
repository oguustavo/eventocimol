const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false, // desativa logs SQL em produção
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            // Necessário para alguns serviços de banco de dados gratuitos
            ssl: process.env.NODE_ENV === 'production' ? {
                require: true,
                rejectUnauthorized: false
            } : false
        }
    }
)

try {
    sequelize.authenticate()
    console.log('Conectamos ao banco de dados!')
} catch (error) {
    console.log(`Não foi possível conectar ao banco de dados: ${error}`)
}

module.exports = sequelize
