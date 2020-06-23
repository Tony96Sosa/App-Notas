// ============================
// PUERTOS
// ============================

process.env.PORT = process.env.PORT || 3000;

//===================================
// ENTORNO
//===================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===================================
// BASE DE DATOS
//===================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/User-Login';
} else {
    urlDB = process.env.MONGO_URL; // variable de entorno de heroku para no mostar la url de mongo
}

process.env.URLDB = urlDB;


// ============================
// 
// ============================