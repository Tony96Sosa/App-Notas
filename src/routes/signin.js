const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const passport = require('passport');

// //Micro-Servicio para renderizar la pagina SIGN-IN
router.get('/signin', (req, res) => {
    res.render('signin')
});

// //Micro-Servicio para CREAR un Usuario
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    badRequestMessage: 'Algun campo esta vacio. Intentalo nuevamente',
    failureFlash: true,
}))

module.exports = router;