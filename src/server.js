const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
//const morgan = require('morgan');

//Settings
require('./config/config');
require('./config/passport');
app.set('view engine', 'hbs');
hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
// app.engine('.hbs', exphbs({ defaultLayout: 'main' }));
//app.set('views',path.resolve(__dirname, './views'));

//Midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Routes (es un middleware)
app.use(require('./routes/index'));

//Static Files (es un middleware)
app.use(express.static(path.resolve(__dirname, '../public')));


//Conectar la Base de Datos
mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    });

//Para levantar, arrancar el servidor 
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});