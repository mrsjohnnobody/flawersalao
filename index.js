const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
const app = express();
const conn = require("./db/conn");

// models
const Service = require("./models/Service");
const Product = require("./models/Product");
const Sales = require("./models/Sales");

// routes
const serviceRoutes = require("./routes/serviceRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.use("/", serviceRoutes);
app.use("/", productRoutes);
app.use("/", salesRoutes);

conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
