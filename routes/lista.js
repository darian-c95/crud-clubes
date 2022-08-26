const {Router} = require('express');
const router = Router();

const { listaEquipos } = require('../controllers/lista');


router.get('/', listaEquipos);

module.exports = router;