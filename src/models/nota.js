const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let notaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es requerido'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: String,
    }
});

module.exports = mongoose.model('Nota', notaSchema);