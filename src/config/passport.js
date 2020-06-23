const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    Usuario.findOne({ email: email }, (err, usuarioDB) => {
        if (err) {
            return done(err, false, { message: 'Algun campo esta vacio.' });
        }
        if (!usuarioDB) {
            return done(null, false, { message: '(Usuario) incorrecto' });
        }
        if (!bcrypt.compareSync(password, usuarioDB.password)) {
            return done(null, false, { message: '(Contraseña) incorrecta' })
        }
        return done(null, usuarioDB);
    })
}))



passport.serializeUser((usuarioDB, done) => {
    done(null, usuarioDB.id);
});
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuarioDB) => {
        done(err, usuarioDB);
    })
})