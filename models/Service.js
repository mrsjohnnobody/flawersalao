const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Service = db.define("Service", {
  date: {
    type: DataTypes.DATEONLY,
    required: true,
  },
  clientName: {
    type: DataTypes.STRING,
    required: true,
  },
  description: {
    type: DataTypes.STRING,
    required: true,
  },
  typeOf: {
    type: DataTypes.STRING,
    required: true,
  },
  price: {
    type: DataTypes.INTEGER,
    required: true,
  },
  colaborator: {
    type: DataTypes.STRING,
    required: true,
  },
  commission: {
    type: DataTypes.INTEGER,
    required: true,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    required: true,
  },
}, {
  getterMethods: {
  totalCommission() {
    return this.price * this.commission;
  }
}})

module.exports = Service;
