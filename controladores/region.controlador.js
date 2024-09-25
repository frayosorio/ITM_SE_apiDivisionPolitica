const regionRepositorio = require('../repositorios/region.repositorio');

exports.listar = (solicitud, respuesta) => {
    regionRepositorio.listar(solicitud.params.id, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error obteniendo la lista de regiones"
                }
            );
        }
        return respuesta.send(datos);
    });
}

exports.agregar = (solicitud, respuesta) => {
    if(!solicitud.body){
        return respuesta.status(400).send(
            {
                mensaje: "El contenido de la solicitud debe incluir la región"
            }
        );
    }
    regionRepositorio.agregar(solicitud.params.id, solicitud.body, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error agregando región"
                }
            );
        }
        return respuesta.send(datos);
    });
}

exports.modificar = (solicitud, respuesta) => {
    if(!solicitud.body || !solicitud.body.nombre ){
        return respuesta.status(400).send(
            {
                mensaje: "El contenido de la solicitud debe incluir la región"
            }
        );
    }
    regionRepositorio.modificar(solicitud.params.id, solicitud.body, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error modificando región"
                }
            );
        }
        return respuesta.send(datos);
    });
}

exports.eliminar = (solicitud, respuesta) => {
    regionRepositorio.eliminar(solicitud.params.id, solicitud.params.nombre, (error, datos) => {
        if (error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error eliminando región"
                }
            );
        }
        return respuesta.send(datos);
    });
}

