const { response , request} = require('express');

const getUsers = (req = request, res = response) => {
    const query = req.query
    res.status(403).json({
        msg : 'Get API',
        query
    });
};

const putUsers = (req = request, res = response) => {

    const id = req.params.id;

    res.status(500).json({
        msg : 'Put API - cotrolador',
        id
    });
};

const postUsers = (req = request, res = response) => {

    const body = req.body;

    res.status(201).json({
        msg : 'Post API - controlador',
        body
    });
};

const patchUsers = (req = request, res = response) => {
    res.status(201).json({
        msg : 'patch API - controlador'

    });
};

const deleteUsers = (req = request, res = response) => {
    res.status(403).json({
        msg : 'Delete API - controlador'
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers
}