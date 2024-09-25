module.exports = (app) => {

    const controlador = require("../controladores/region.controlador");

    app.get("/regiones/:id", controlador.listar);
    app.post("/regiones/:id", controlador.agregar);
    app.put("/regiones/:id", controlador.modificar);
    app.delete("/regiones/:id/:nombre", controlador.eliminar);

}