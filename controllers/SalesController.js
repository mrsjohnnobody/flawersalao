const sequelize = require("../db/conn");
const Product = require("../models/Product");
const Sales = require("../models/Sales");

module.exports = class SalesController {
  static async getSales(req, res) {
    const sales = await Sales.findAll({ raw: true });

    const modifiedSales = sales.map((sale) => {
      const totalSales = sale.price * sale.soldQuantity;
      return { ...sale, totalSales };
    });

    res.render("sales/allsales", { sales: modifiedSales });
  }

  static async salesByColaborator(req, res) {
    try {
      const sales = await Sales.findAll({ raw: true });

      const collaborators = {
        Alessandra: "Alessandra",
        Erika: "Erika",
        Eduarda: "Eduarda",
        Kassia: "Kassia",
      };

      const collaboratorSales = Object.entries(collaborators).reduce(
        (salesData, [collaborator, name]) => {
          salesData[collaborator] = sales
            .filter((sale) => sale.colaborator === name)
            .reduce((sum, sale) => sum + sale.price, 0);
          return salesData;
        },
        {}
      );

      res.render("sales/salesBy", {
        sales,
        collaboratorSales,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }

  static async createSale(req, res) {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id: id }, raw: true });

    res.render("sales/home", { product });
  }

  static async createSaleSave(req, res) {
    try {
      const id = req.body.id;
      const product = await Product.findByPk(id);
      const sale = {
        name: req.body.name,
        date: req.body.date,
        colaborator: req.body.colaborator,
        paymentMethod: req.body.paymentMethod,
        price: req.body.price,
        commission: req.body.commission,
        soldQuantity: req.body.soldQuantity,
      };

      await Sales.create(sale);

      product.quantity -= req.body.soldQuantity;
      await product.save();

      res.redirect(`/sales`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  static async editSale(req, res) {
    const { id } = req.params;

    const sale = await Sales.findByPk(id, { raw: true });
    const product = await Product.findByPk(id, { raw: true });

    res.render("sales/edit", { sale, product });
  }

  static async editSaleSave(req, res) {
    const { id } = req.params;
    const {
      date,
      colaborator,
      paymentMethod,
      price,
      commission,
      soldQuantity,
    } = req.body;

    const sale = await Sales.findOne(id);

    const originalQuantity = sale.soldQuantity;

    await sale.update({
      date,
      colaborator,
      paymentMethod,
      price,
      commission,
      soldQuantity,
    });

    const product = await Product.findOne({
      where: { id: sale.id },
    });
    await product.update({
      quantity: product.quantity + originalQuantity - soldQuantity,
    });

    res.redirect("/sales");
  }

  static async deleteSale(req, res) {
    const { id } = req.params;
    const sale = await Sales.findByPk(id);

    const product = await Product.findOne({
      where: { id: sale.id },
    });
    await product.update({
      quantity: product.quantity + sale.soldQuantity,
    });

    await sale.destroy();

    res.redirect("/sales");
  }
};
