const sequelize = require('./conn');
const User = require('../models/User');
const Evento = require('../models/Evento');
const Participacao = require('../models/Participacao');

async function sync() {
    try {
        User.hasMany(Participacao);
        Participacao.belongsTo(User);
        
        Evento.hasMany(Participacao);
        Participacao.belongsTo(Evento);

        await sequelize.sync();
        console.log('Banco de dados sincronizado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao sincronizar banco de dados:', error);
        process.exit(1);
    }
}

sync(); 