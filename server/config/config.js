///////////////////////
// PUERTO
///////////////////////
process.env.PORT = process.env.PORT || 3000

///////////////////////
// ENTORNO
///////////////////////
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

///////////////////////
// BASE DE DATOS
///////////////////////
let urlDB
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB

///////////////////////
// VENCIMIENTO TOKEN 
///////////////////////
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30


///////////////////////
// SEED DEL TOKEN
///////////////////////
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

///////////////////////
// GOOGLE CLIENT ID
///////////////////////
process.env.CLIENT_ID = process.env.CLIENT_ID || '267471859220-ngv0l6jlhn4qj5bqvg21kktrdd81q25e.apps.googleusercontent.com'