const express = require('express');
const router = express.Router();
const EventosControllers = require('../controllers/EventosControllers');

// Rota do dashboard
router.get('/dashboard', EventosControllers.dashboard);

// ... outras rotas

module.exports = router;
