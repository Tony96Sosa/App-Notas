const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: false,
        //required: [true, 'El nombre es requerido'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerido'],
    },
    // img: {
    //     type: String,
    //     required: false,
    // },
    // role: {
    //     type: String,
    //     default: 'USER_ROLE',
    //     enum: rolesValidos,
    // },
    // estado: {
    //     type: Boolean,
    //     default: true,
    // },
    // google: {
    //     type: Boolean,
    //     default: false,
    // }
});

usuarioSchema.plugin(uniqueValidator, { message: 'Error, {PATH} debe ser único. Ya existe un usuario con ese {PATH}.' });

module.exports = mongoose.model('Usuario', usuarioSchema);