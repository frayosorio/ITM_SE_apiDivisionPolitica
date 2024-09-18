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

exports.agregar = (solicitud, respuesta) => {
    paisRepositorio.agregar(solicitud.body, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error agregando país"
                }
            );
        }
        return respuesta.send(datos);
    });
}

exports.modificar = (solicitud, respuesta) => {
    if(!solicitud.body || !solicitud.body.id || !solicitud.body.nombre){
        return respuesta.status(400).send(
            {
                mensaje: "El contenido de la solicitud debe incluir el país"
            }
        );
    }
    paisRepositorio.modificar(solicitud.body, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error modificando país"
                }
            );
        }
        return respuesta.send(datos);
    });
}

exports.eliminar = (solicitud, respuesta) => {
    paisRepositorio.eliminar(solicitud.params.id, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error eliminando país"
                }
            );
        }
        return respuesta.send(datos);
    });
}

