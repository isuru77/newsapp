const users = require("../api/users");
const express = require("express");


module.exports = function(app) {
    app.use(express.json());    
    app.use("/api/users", users);
    // app.use(error);
  
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("static")); // give folder name
    // app.use(helmet());
    app.disable("x-powered-by"); // for security reasons
  
    // if (app.get("env") === "development") {
    //   // dev env only
    //   // to log requsets
    //   app.use(morgan("tiny"));
    // }
  };
  