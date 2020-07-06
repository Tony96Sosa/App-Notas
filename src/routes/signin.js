const express = require('express');
const router = express.Router();
const passport = require('passport'); //verifica que exista el Usuario

// //Micro-Servicio para renderizar la pagina SIGN-IN
router.get('/signin', (req, res) => {
    res.render('signin')
});

// //Micro-Servicio para Ingresar un Usuario ya Registrado
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    badRequestMessage: 'Algun campo esta vacio. Intentalo nuevamente',
    failureFlash: true,
}))

module.exports = router;