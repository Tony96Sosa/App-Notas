const express = require('express');
const router = express.Router();
const Nota = require('../models/nota'); //Modelo de UsuarioDB
const { isAuthenticated } = require('../helpers/auth'); //verifica si hay un usuario en sesion

//Micro-Servicio para renderizar la pagina Nueva Nota
router.get('/nota-nueva', isAuthenticated, (req, res) => {
    res.render('new-note');
});

//Micro-Servicio para CREAR una Nota
router.post('/nota-nueva', (req, res) => {
    let body = req.body;
    //Array de Errores para imprimir con FLASH
    const errors = [];
    //Validaciones para campos vacios
    if (body.title.length <= 0 || body.description.length <= 0) {
        errors.push({ text: 'Algun campo esta vacio.' });
    }
    if (errors.length > 0) {
        res.render('new-note', { errors, body });
    } else {
        let nota = new Nota({
            titulo: body.title,
            descripcion: body.description,
        });
        nota.usuario = req.user._id;
        // Guardar el usuario en la DB
        nota.save((err, notaDB) => {
            if (err) {
                req.flash('error_msg', 'Algun error en la Base de Datos');
                res.render('new-note');
            }
            if (notaDB) {
                req.flash('success_msg', 'Se guardo la nota exitosamente');
                res.redirect('/notas');
            }
        })
    }
});

//Micro-Servicio para renderizar la pagina de Todas las Notas
router.get('/notas', isAuthenticated, async(req, res) => {
    const notas = await Nota.find({ usuario: req.user._id, }).sort({ fecha: 'desc' });
    res.render('all-notes', { notas });
});

//Micro-Servicio para renderizar la pagina de EDITAR una Nota
router.get('/nota-editar/:id', isAuthenticated, async(req, res) => {
    const nota = await Nota.findById(req.params.id);
    res.render('edit-note', { nota });
});

//Micro-Servicio para actualizar los cambios de EDITAR una Nota
router.put('/nota-editar/:id', async(req, res) => {
    let id = req.params.id;
    let body = req.body;
    await Nota.findByIdAndUpdate(id, { titulo: body.title, descripcion: body.description }, { new: true, runValidators: true }, (err, notaDB) => {
        if (err) {
            req.flash('error_msg', 'Algun campo se guardo Vacio');
            res.redirect('/notas');
        }
        if (notaDB) {
            req.flash('success_msg', 'Se guardo la Actualizacion de la nota exitosamente');
            res.redirect('/notas');
        }
    });
});

router.delete('/nota-eliminar/:id', async(req, res) => {
    let id = req.params.id;
    await Nota.findByIdAndDelete(id);
    req.flash('success_msg', 'Se ELIMINO la nota exitosamente');
    res.redirect('/notas');
})



module.exports = router;