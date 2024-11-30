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
    logging: false // desativa logs SQL em produção
  }
)

try {
  sequelize.authenticate()
  console.log('Conectamos ao banco de dados!')
} catch (error) {
  console.log(`Não foi possível conectar ao banco de dados: ${error}`)
}

module.exports = sequelize
