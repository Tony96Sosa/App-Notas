const { deserializeUser } = require("passport");

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Usuario no autorizado. Necesita Loguearse para ingresar a la aplicación')
    res.redirect('/signin');
}

module.exports = helpers;