const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Product = require("./Product");

const Sales = db.define("Sales", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commission: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  soldQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Sales;
