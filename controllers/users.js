const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
    // const query = req.query

    const { limit = 10, from = 0 } = req.query;

    const [total , users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true }).skip(Number(from)).limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        data : users
    });
};

const putUsers = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...other } = req.body;

    //Validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        other.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, other);

    res.status(202).json({
        user
    });
};

const postUsers = async (req = request, res = response) => {


    const { name, password, email, role } = req.body;
    const user = new User({ name, password, email, role });


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar base de datos
    await user.save();

    res.status(201).json({
        user

    });
};

const patchUsers = (req = request, res = response) => {
    res.status(201).json({
        msg: 'patch API - controlador'

    });
};

const deleteUsers = async(req = request, res = response) => {
    
    const { id } = req.params;
    const user = await  User.findByIdAndUpdate(id, {status : false});
    


    res.status(403).json({
        msg: 'Delete API - controlador',
        user
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers
}