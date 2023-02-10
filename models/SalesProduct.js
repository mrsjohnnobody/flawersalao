const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const SalesProduct = db.define("SalesProduct", {
  date: {
    type: DataTypes.DATEONLY,
    required: true,
  },
  colaborator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  commission: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  soldQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = SalesProduct;
