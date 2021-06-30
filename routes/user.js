const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const Controller = require('../controllers/users');
const { validateRol, validationEmail, validationMongoId} = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt');
const GoogleBolean = require('../middlewares/validateGoogleStatus');
const {verifyAdminRole, VerifyRole} = require('../middlewares/validateRoles');

router.get('/', Controller.getUsers);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validationMongoId),
    check('role').custom( validateRol ),
    validateFields
],Controller.putUsers );

router.post('/', [
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe ser mayor de 6 letras').isLength({min:6}),
    // check('role','No es un rol valido').isIn(['admin','user']),
    check('role').custom( validateRol ),
    check('email').custom(validationEmail),
    validateFields

] , Controller.postUsers);

router.patch('/', Controller.patchUsers);

router.delete('/:id', [
    validateJwt,
    // verifyAdminRole,
    VerifyRole("user"),
    GoogleBolean(false),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validationMongoId),
    validateFields
],Controller.deleteUsers);



module.exports = router;