const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');

//Middlewares
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email','El correo no es valido').isEmail().notEmpty(),
    check('password','La contraseña no es valida').notEmpty(),
    validateFields
],  login);

module.exports = router;