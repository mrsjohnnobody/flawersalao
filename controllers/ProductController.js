const sequelize = require("../db/conn");
const Product = require("../models/Product");

module.exports = class ProductController {
  static async home(req, res) {
    const products = await Product.findAll({ raw: true });

    res.render("product/home", { products });
  }

  static createProduct(req, res) {
    res.render("product/create");
  }

  static async createProductSave(req, res) {
    const product = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    await Product.create(product);

    res.redirect("/products");
  }

  static async updateProduct(req, res) {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id: id }, raw: true });

    res.render("product/edit", { product });
  }

  static async updateProductSave(req, res) {
    const id = req.body.id;

    const product = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    await Product.update(product, { where: { id: id } });

    res.redirect("/products");
  }
};
