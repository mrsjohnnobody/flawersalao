const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/products/create", ProductController.createProduct);
router.post("/products/create", ProductController.createProductSave);
router.get("/products/edit/:id", ProductController.updateProduct);
router.post("/products/edit", ProductController.updateProductSave);
router.get("/products", ProductController.home);

module.exports = router;
