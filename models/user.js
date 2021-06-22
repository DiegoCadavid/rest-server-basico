const { Schema, model } = require('mongoose');

const UserShema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['admin']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

UserShema.methods.toJSON = function() {
    const {__v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User',UserShema);

// {
//     name: 'Diego',
//     email: 'asdas@g',
//     password: '1238313',
//     rol: '213323123',
//     status: false,
//     google: false
// }