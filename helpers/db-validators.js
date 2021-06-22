const Role = require('../models/role');
const User = require('../models/user');

const validateRol = async (role) => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error('El rol registrado no esta en la BD');
    }
}

const validationEmail = async(email) => {
    const ExistEmail = await User.findOne({ email });
    if (ExistEmail) {
        throw new Error('El correo ya esta registrado en la BD');
    }
}

const validationMongoId= async(id) => {
    const ExistId = await User.findById(id);
    if (!ExistId) {
        throw new Error('El id no esta registrado en la BD');
    }
}

module.exports = {
    validateRol,
    validationEmail,
    validationMongoId
}