const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Sales = require("./Sales");

const Product = db.define("Product", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  price: {
    type: DataTypes.INTEGER,
    required: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
