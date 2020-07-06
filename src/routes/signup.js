const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Encryptar
const Usuario = require('../models/usuario'); //Modelo de UsuarioDB

//Micro-Servicio para renderizar la pagina SIGN-UP
router.get('/signup', (req, res) => {
    res.render('signup')
});

//Micro-Servicio para CREAR un Usuario
router.post('/signup', (req, res) => {
    let body = req.body;
    //Array de Errores para imprimir con FLASH
    const errors = [];
    //Validaciones para campos vacios
    if (body.nombre.length <= 0 || body.password.length <= 0 || body.email.length <= 0) {
        errors.push({ text: 'Algun campo esta vacio.' });
    }
    if (errors.length > 0) {
        res.render('signup', { errors, body });
    } else {
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10), //Encriptar antes de guardar
        });
        // Guardar el usuario en la DB
        usuario.save((err, usuarioDB) => {
            if (err) {
                req.flash('error_msg', 'Ya existe un Usuario con este Email');
                res.redirect('signup');
            }
            if (usuarioDB) {
                req.flash('success_msg', 'Te registraste Exitosamente');
                res.redirect('/signin');
            }
        })
    }
});
module.exports = router;