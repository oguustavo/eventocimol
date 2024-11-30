const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

try {
    sequelize.authenticate()
    console.log('Conexão estabelecida com sucesso.')
} catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error)
}

module.exports = sequelize
