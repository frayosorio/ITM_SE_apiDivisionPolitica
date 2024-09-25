const express = require('express')
const app = express()


//conectarse a la base de datos
const bd = require('./repositorios/bd');
bd.conectar();

const puerto = 3030
console.log('API División Política Iniciada');

app.use(express.json());

require('./rutas/pais.rutas')(app);
require('./rutas/region.rutas')(app);

app.listen(puerto, () => {
    console.log(`API División Política escuchando por el puerto ${puerto}`);
});