const { Schema , model} = require("mongoose");


const roleShema = Schema({
    role : {
        type : String,
        required : [true, 'El rol es obligatorio']
    }
})

module.exports = model('Role',roleShema);