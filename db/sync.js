const sequelize = require('./conn');
const User = require('../models/User');
const Evento = require('../models/Evento');
const Participacao = require('../models/Participacao');

async function sync() {
    try {
        // Define as relações
        User.hasMany(Participacao);
        Participacao.belongsTo(User);
        
        Evento.hasMany(Participacao);
        Participacao.belongsTo(Evento);

        // Sincroniza os modelos com o banco de dados
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar banco de dados:', error);
        throw error; // Propaga o erro para que o build falhe se a sincronização falhar
    }
}

// Executa a sincronização
sync(); 