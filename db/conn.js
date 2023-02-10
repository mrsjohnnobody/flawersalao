const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("flawersalao", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Conectamos ao MySQL!");
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`);
}

module.exports = sequelize;
