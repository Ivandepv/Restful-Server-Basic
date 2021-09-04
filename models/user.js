const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
    name:   {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'la contrasena es obligatoria']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'el email es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        default: 'USER_ROLE',
        emun: ['USER_ROLE', 'ADMIN_ROLE']
    },

});

UsersSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};


module.exports = model('Users', UsersSchema);



