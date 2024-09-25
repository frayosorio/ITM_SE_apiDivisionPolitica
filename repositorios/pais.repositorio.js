const bd = require('./bd');

const PaisRepositorio = () => { };

PaisRepositorio.listar = async (respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        //***** codigo MONGO para obtener la lista de paises
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
        //***** 
        return respuesta(null, resultado);
    }
    catch (error) {
        console.error('Error al listar los países:', error);
        respuesta(error, null);
    }
}

PaisRepositorio.agregar = async (pais, respuesta) => {
    try {
        const basedatos = bd.obtenerBD();
        //***** codigo MONGO para agregar un Documento Pais
        await basedatos.collection('paises')
            .insertOne(
                {
                    id: pais.id,
                    nombre: pais.nombre,
                    tipoRegion: pais.tipoRegion,
                    continente: pais.continente,
                    codigoAlfa2: pais.codigoAlfa2,
                    codigoAlfa3: pais.codigoAlfa3
                });
        //***** 
        respuesta(null, pais);
    } catch (error) {
        console.log('Error agregando país ', error)
        respuesta(error, null);
    }
}

PaisRepositorio.modificar = async (pais, respuesta) => {
    try {
        const basedatos = bd.obtenerBD();
        //***** codigo MONGO para modificar un Documento Pais
        await basedatos.collection('paises')
            .updateOne(
                { id: pais.id },
                {
                    $set: {
                        nombre: pais.nombre,
                        tipoRegion: pais.tipoRegion,
                        continente: pais.continente,
                        codigoAlfa2: pais.codigoAlfa2,
                        codigoAlfa3: pais.codigoAlfa3
                    }
                });
        //***** 
        respuesta(null, pais);
    } catch (error) {
        console.log('Error modificando país ', error)
        respuesta(error, null);
    }
}

PaisRepositorio.eliminar = async (idPais, respuesta) => {
    try {
        const basedatos = bd.obtenerBD();
        //***** codigo MONGO para eliminar un Documento Pais
        await basedatos.collection('paises')
            .deleteOne(
                { id: parseInt(idPais) });
        //***** 
        respuesta(null, true);
    } catch (error) {
        console.log('Error eliminando país ', error)
        respuesta(error, false);
    }
}

module.exports = PaisRepositorio;