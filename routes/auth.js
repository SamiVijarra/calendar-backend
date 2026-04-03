// Rutas de Auth
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);

router.get(
    '/renew', 
    validarJWT,
    revalidarToken);

module.exports = router; 