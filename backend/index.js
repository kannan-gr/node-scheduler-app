require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const SwaggerExpress = require("swagger-express-mw");
const YAML = require("yamljs");
const path = require("path");

const mongoose = require("mongoose");
const verifyToken = require("./api/middleware/authMiddleware");

const api = require("./api/routes/main.route");

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(
  path.resolve(__dirname, "./api/swagger/swagger.yaml")
);

let dirConfig = {
  appRoot: __dirname + "/", // required config
  swaggerSecurityHandlers: {
    BearerAuth: verifyToken,
  },
};

try {
  let mongoURI = process.env.MONGO_CONNECTION_URI;
  mongoose.connect(mongoURI).then(() => {
    console.log("DB Connection established!");
    SwaggerExpress.create(dirConfig, (err, swaggerExpress) => {
      if (err) {
        throw err;
      }
      swaggerExpress.register(app);
      app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      app.use("/api", api);
      console.log("Swagger created");
      let port = process.env.PORT;
      app.listen(port, () => {
        console.log(`API up and listening at ${port}`);
      });
    });
  });
} catch (ex) {
  console.log(`Example app failed with error ${ex}`);
}
