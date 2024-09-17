const { MongoClient } = require('mongodb');
const configBD = require('../configuracion/bd.config');
const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;

const cliente = new MongoClient(url);
let basedatos;

module.exports = {
    conectar: async () => {
        try {
            await cliente.connect();
            console.log("se ha establecido conexion a la base de datos");
            basedatos = cliente.db(configBD.BASEDATOS);
        }
        catch (error) {
            console.log(error);
        }
    },
    obtenerBD: () => basedatos
}

