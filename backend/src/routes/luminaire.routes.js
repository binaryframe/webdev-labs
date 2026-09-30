module.exports = app => {
  const luminaires = require("../controllers/luminaire.controller.js");
  const router = require("express").Router();

  router.post("/", luminaires.create);
  router.get("/", luminaires.findAll);
  router.get("/total-power", luminaires.getTotalPower);
  router.get("/:id", luminaires.findOne);
  router.put("/:id", luminaires.update);
  router.delete("/:id", luminaires.delete);

  app.use('/api/luminaires', router);
};