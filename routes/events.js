const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();
router.use(validarJWT);

router.get('/', getEventos);

router.post('/', crearEvento); 

router.put('/:id', actualizarEvento); 

router.delete('/:id', eliminarEvento);

module.exports = router;