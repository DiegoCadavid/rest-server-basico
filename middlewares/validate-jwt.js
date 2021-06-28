const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJwt = async (req = request, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(400).json({
            msg: 'Token no introducido'
        });
    }

    try {


        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const user = await User.findById(uid);

        //Verificamos la existencia del usuario
        if(!user) {
            return res.status(401).json({
                msg: 'El usuario no existe - (en la base de datos) '
            });
        }

        //Verificamos el estado del usuario
        if (!user.status) {
            return res.status(401).json({
                msg: 'El usuario no existe - (Status false) '
            });
        }

        req.authUser = user;






        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token invalido'
        });
    }

}

module.exports = validateJwt;
