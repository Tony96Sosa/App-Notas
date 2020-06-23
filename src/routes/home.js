const express = require('express');
const router = express.Router();

// //Micro-Servicio para renderizar la pagina home
router.get('/', (req, res) => {
    res.render('home')
});

module.exports = router;