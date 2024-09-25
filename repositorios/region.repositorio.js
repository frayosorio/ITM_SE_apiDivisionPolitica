const bd = require('./bd');

const RegionRepositorio = () => { };

RegionRepositorio.listar = async (idPais, respuesta) => {
    const basedatos = bd.obtenerBD();
    try {
        //***** codigo MONGO para obtener la lista de regiones
        const resultado = await
            basedatos.collection('paises')
                .aggregate([
                    {
                        $match: { id: parseInt(idPais) }
                    },
                    {
                        $project: {
                            'regiones.nombre': 1,
                            'regiones.area': 1,
                            'regiones.poblacion': 1,
                        }
                    }
                ])
                .toArray();
        //***** 
        return respuesta(null, resultado.length > 0 ? resultado[0].regiones : []);
    }
    catch (error) {
        console.error('Error al listar los regiones:', error);
        respuesta(error, null);
    }
}

RegionRepositorio.agregar = async (idPais, region, respuesta) => {
    try {
        const basedatos = bd.obtenerBD();
        //***** codigo MONGO para agregar un Documento Region
        await basedatos.collection('paises')
            .updateOne(
                { id: parseInt(idPais) },
                {
                    $push: {
                        regiones: {
                            nombre: region.nombre,
                            area: region.area,
                            poblacion: region.poblacion
                        }
                    }
                });
        //***** 
        respuesta(null, region);
    } catch (error) {
        console.log('Error agregando región ', error)
        respuesta(error, null);
    }
}

RegionRepositorio.modificar = async (idPais, region, respuesta) => {
    try {
        const basedatos = bd.obtenerBD();
        //***** codigo MONGO para modificar un Documento Region
        await basedatos.collection('paises')
            .updateOne(
                {
                    id: parseInt(idPais),
                    regiones: { $elemMatch: { nombre: region.nombre } }
                },
                {
                    $set: {
                        'regiones.$.area': region.area,
                        'regiones.$.poblacion': region.poblacion,
                    }
                });
        //***** 
        respuesta(null, region);
    } catch (error) {
        console.log('Error modificando región ', error)
        respuesta(error, null);
    }
}

RegionRepositorio.eliminar = async (idPais, nombreRegion, respuesta) => {
    try {
        const basedatos = bd.obtenerBD();
        //***** codigo MONGO para eliminar un Documento Region
        await basedatos.collection('paises')
            .updateOne(
                { id: parseInt(idPais) },
                {
                    $pull: {
                        regiones: {
                            nombre: nombreRegion
                        }
                    }
                });
        //***** 
        respuesta(null, true);
        console.log("Región eliminada con nombre :", nombreRegion);
    } catch (error) {
        console.log('Error eliminando región ', error)
        respuesta(error, false);
    }
}

module.exports = RegionRepositorio;