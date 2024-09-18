module.exports = (app) => {

    const controlador = require("../controladores/pais.controlador");

    app.get("/paises", controlador.listar);
    app.post("/paises", controlador.agregar);
    app.put("/paises", controlador.modificar);
    app.delete("/paises/:id", controlador.eliminar);

}