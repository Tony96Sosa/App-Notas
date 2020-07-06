const express = require('express');
const router = express.Router();

// //Micro-Servicio para Cerrar Sesion y volver al Home
router.get('/signout', (req, res) => {
    req.logOut();
    res.redirect('/')
});

module.exports = router;