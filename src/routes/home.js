const express = require('express');
const router = express.Router();

// //Micro-Servicio para renderizar la pagina Home
router.get('/', (req, res) => {
    res.render('home')
});

module.exports = router;