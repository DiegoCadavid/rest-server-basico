const { response, request } = require('express')

const verifyAdminRole = (req, res = response, next) => {

    if (!req.authUser) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token"
        })
    }

    const { role, name } = req.authUser;

    if (role !== "admin") {
        return res.status(401).json({
            msg: `${name} No es administrador`
        })
    }
    next();
}


const VerifyRole = (...rest ) => {
    return (req = request, res = response, next) => {

        if (!req.authUser) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token"
            })
        }

        if(!rest.includes( req.authUser.role )) {
            return res.status(401).json({
                msg : `El usuario requiere uno de estos roles "${rest}"`
            })
        }

        next();
    }
}


module.exports = { verifyAdminRole , VerifyRole};