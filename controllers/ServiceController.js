const sequelize = require("../db/conn");
const Service = require("../models/Service");

module.exports = class ServiceController {
  static async home(req, res) {
    const users = await Service.findAll({ raw: true });

    res.render("user/home", { users });
  }

  static createService(req, res) {
    res.render("user/service");
  }

  static async createServiceSave(req, res) {
    const user = {
      date: req.body.date,
      clientName: req.body.clientName,
      description: req.body.description,
      typeOf: req.body.typeOf,
      price: req.body.price,
      colaborator: req.body.colaborator,
      commission: req.body.commission,
      paymentMethod: req.body.paymentMethod,
    };

    await Service.create(user);

    res.redirect("/");
  }

  static async updateService(req, res) {
    const id = req.params.id;

    const service = await Service.findOne({ where: { id: id }, raw: true });

    res.render("user/edit", { service });
  }

  static async updateServicePost(req, res) {
    const id = req.body.id;

    const service = {
      date: req.body.date,
      clientName: req.body.clientName,
      description: req.body.description,
      typeOf: req.body.typeOf,
      price: req.body.price,
      colaborator: req.body.colaborator,
      commission: req.body.commission,
      paymentMethod: req.body.paymentMethod,
    };

    await Service.update(service, { where: { id: id } });

    res.redirect("/add");
  }

  static async removeService(req, res) {
    const id = req.body.id;

    await Service.destroy({ where: { id: id } });

    res.redirect("/");
  }

  static async getCommissions(req, res) {
    const services = await Service.findAll({ raw: true });

    const modifiedServices = services.map((service) => {
      const totalCommission = (service.price * service.commission) / 100;
      return { ...service, totalCommission };
    });

    res.render("user/commissions", { services: modifiedServices });
  }
};
