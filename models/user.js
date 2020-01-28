const sequelize = require("../startup/db");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

const schema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  birthday: Joi.string(),
  isAdmin: Joi.boolean()
});

function validateUser(userObject) {
  return schema.validate(userObject);
}

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birthday: {
    allowNull: true,
    type: DataTypes.DATE
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

User.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateHash = function() {
  return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
};

User.prototype.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this.id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

User.sync(); // { force: true }

exports.User = User;
exports.validateUser = validateUser;
