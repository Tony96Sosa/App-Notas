const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth'); //verifica si hay un usuario en sesion

// //Micro-Servicio para renderizar la pagina PROFILE
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile')
});
module.exports = router;