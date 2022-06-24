module.exports = app => {
    const ep = require("../controllers/users.controller.js");

    var router = require("express").Router();

    //Verificar auth do usuário
    router.post("/check", ep.check);

    // Create a new Tutorial
    router.post("/", ep.create);

    // Retrieve all Tutorial
    router.get("/", ep.findAll);

    router.post("/login", ep.login);

    // Retrieve all published Tutorial
    router.get("/ativos", ep.findAllAtivos);

    // Retrieve a single Tutorial with id
    // router.get("/:id", ep.findOne);
    router.get("/id", ep.findOne);

    // Update a Tutorial with id
    router.put("/id", ep.update);

    // Delete a Tutorial with id
    router.delete("/:id", ep.delete);

    // Delete all Tutorial
    router.delete("/", ep.deleteAll);

    app.use('/api/usuarios', router);
};