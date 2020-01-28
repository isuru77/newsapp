const express = require("express");
const winston = require("winston");
app = express();

// require("./startup/logging")();
require("./startup/db");
require("./startup/config")();
// require("./startup/prod")(app);
// require("./startup/validation")();
require("./startup/routes")(app); 

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening to prot"));
