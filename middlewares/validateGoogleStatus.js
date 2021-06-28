
const {response, request} = require('express')

const GoogleBolean = (bool) => {
    return (req = request, res = response, next) => {

        //Validar token
        if(!req.authUser) {
            return res.status(500).json({
                msg : "El token del usuario no se a validado! ^.^' "
            })
        }


        //Validar estado de google
        if(req.authUser.google !== bool){
            return res.status(406).json({
                msg : `El usuario no tiene el rol especificado (${bool})`
            });
        }

        next();
        
    }
}

module.exports = GoogleBolean;