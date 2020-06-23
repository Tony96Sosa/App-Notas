const express = require('express');
const router = express.Router();

// //Micro-Servicio para renderizar la pagina SIGN-IN
router.get('/signout', (req, res) => {
    req.logOut();
    res.redirect('/')
});

module.exports = router;