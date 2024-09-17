const bd = require('./bd');

const PaisRepositorio = () => { };

PaisRepositorio.listar = async (respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        const resultado = await
            basedatos.collection('paises')
                .find()
                .project(
                    {
                        id: 1,
                        nombre: 1,
                        continente: 1,
                        tipoRegion: 1,
                        codigoAlfa2: 1,
                        codigoAlfa3: 1
                    }
                )
                .toArray();
        return respuesta(null, resultado);
    }
    catch (error) {
        console.error('Error al listar los países:', error);
        respuesta(error, null);
    }
}

module.exports = PaisRepositorio;