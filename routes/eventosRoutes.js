const express = require('express');
const router = express.Router();
const EventosControllers = require('../controllers/EventosControllers');

// Middleware de autenticação
const checkAuth = (req, res, next) => {
    if (!req.session.userid) {
        req.flash('message', 'Por favor, faça login para acessar esta página')
        return res.redirect('/login')
    }
    next()
}

// Rotas principais
router.get('/dashboard', checkAuth, EventosControllers.dashboard);
router.get('/meus-eventos', checkAuth, EventosControllers.meusEventos);
router.get('/add', checkAuth, EventosControllers.createEvento);
router.post('/add', checkAuth, EventosControllers.createEventoSave);
router.get('/edit/:id', checkAuth, EventosControllers.updateEvento);
router.post('/edit', checkAuth, EventosControllers.updateEventoPost);
router.post('/remove', checkAuth, EventosControllers.removeEvento);
router.get('/participar/:id', checkAuth, EventosControllers.participarEvento);
router.get('/eventos-participando', checkAuth, EventosControllers.eventosParticipando);

module.exports = router;
