const express = require("express");
const router = express.Router();

const SalesController = require("../controllers/SalesController");

router.get("/products/:id/sale", SalesController.createSale);
router.post("/products/sale", SalesController.createSaleSave);
router.get("/sales/:id/edit", SalesController.editSale);
router.post("/sales/edit", SalesController.editSaleSave);
router.post("/sales/:id/delete", SalesController.deleteSale);
router.get("/sales/filtered", SalesController.salesByColaborator);
router.get("/sales", SalesController.getSales);

module.exports = router;
