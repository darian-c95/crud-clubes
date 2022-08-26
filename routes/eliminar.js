const {Router} = require('express');
const router = Router();

const { eliminarEquipo, equipoEliminado } = require('../controllers/eliminar');


router.get('/equipo/:id/eliminar', eliminarEquipo);

router.delete('/:id/eliminado', equipoEliminado);


module.exports = router;