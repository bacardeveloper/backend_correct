const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const { print } = require("print_console_log");
const { connectionMongoDb } = require("./models/config_database");

// config
let port_config = 8080;
const main_express = express();
const PORT = process.env.PORT || port_config;

let reponseMongoDb = {
  success: "connexion mongodb ok",
  error: "connexion mongodb not ok",
};

connectionMongoDb()
  .then((res) => {
    print(reponseMongoDb.success);
  })
  .catch((err) => {
    print(reponseMongoDb.error);
  });

main_express.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

main_express.use(helmet());
main_express.use(express.json());

// routes
const routes = {
  logRoutes: require("./api_routes/log_routes"),
  crudRoutes : require("./api_routes/crud_routes")
};

// global middleware
main_express.use("/log", routes.logRoutes);
main_express.use("/crud", routes.crudRoutes);

function listenPort() {
  if (process.env.NODE_ENV !== "test") {
    main_express.listen(PORT, () => {
      print("############################################");
      print(`# server running at: http://localhost:${PORT} #`);
      print("############################################");
    });
  }
}

listenPort();

module.exports = main_express;
