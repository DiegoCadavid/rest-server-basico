const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const generateJWT = require('../helpers/GenerateJWT');

const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg : 'El usuario no existe'
            })
        }

        //Si el usuario esta activo
        if(!user.status){
            return res.status(400).json({
                msg : 'El usuario esta inactivo'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg : 'La contraseña no es correcta'
            })
        }

        //General el JWT
        const token = await generateJWT(user.id);

         res.status(200).json({
            user, 
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Oops!, Algo salio mal ^^"'
        })
    }

}

module.exports = {
    login
}