const sequelize = require('./conn');
const User = require('../models/User');
const Evento = require('../models/Evento');
const Participacao = require('../models/Participacao');

const sync = async () => {
    try {
        // Define as relações
        User.hasMany(Participacao);
        Participacao.belongsTo(User);
        
        Evento.hasMany(Participacao);
        Participacao.belongsTo(Evento);

        // Sincroniza os modelos com o banco de dados
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao sincronizar banco de dados:', error);
        process.exit(1);
    }
};

sync(); 