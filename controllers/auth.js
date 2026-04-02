const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async ( req, res = response ) => {
//    const { name, email, password } = req.body;

    try {
        const usuario = new Usuario( req.body );

        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'register',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    } 
};

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
};

const revalidarToken = ( req, res = response ) => {
    res.status(200).json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};  