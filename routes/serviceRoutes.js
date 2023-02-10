const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/ServiceController");

router.get("/add", ServiceController.createService);
router.post("/add", ServiceController.createServiceSave);
router.post("/remove", ServiceController.removeService);
router.get("/commissions", ServiceController.getCommissions);
router.get("/edit/:id", ServiceController.updateService);
router.post("/edit", ServiceController.updateServicePost);
router.get("/", ServiceController.home);

module.exports = router;
