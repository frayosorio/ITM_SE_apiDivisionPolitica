const paisRepositorio = require('../repositorios/pais.repositorio');

exports.listar = (solicitud, respuesta) => {
    paisRepositorio.listar((error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error obteniendo la lista de paises"
                }
            );
        }
        return respuesta.send(datos);
    });
}