const {Router} = require('express');
const router = Router();

const { verEquipo } = require('../controllers/ver');


router.get('/equipo/:id/ver', verEquipo);

module.exports = router;