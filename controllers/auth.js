const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }
        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name );

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    } 
};

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if ( !usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found'
            });
        }
        
        const validPassword = bcrypt.compareSync (password, usuario.password); 

        if ( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = await generarJWT( usuario.id, usuario.name );

        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({  
            ok: false,
            msg: 'Error logging in'
        });
    }

} ;

const revalidarToken = async ( req, res = response ) => { 

    const { uid, name } = req;

    const token= await generarJWT( uid, name );

    return res.status(200).json({
        ok: true,
        token
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};  