module.exports = app => {
    const ep = require("../controllers/produtos.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", ep.create);

    // Retrieve all Tutorial
    router.get("/", ep.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", ep.findOne);

    // Update a Tutorial with id
    router.put("/:id", ep.update);

    // Delete a Tutorial with id
    router.delete("/:id", ep.delete);

    app.use('/api/produtos', router);
};