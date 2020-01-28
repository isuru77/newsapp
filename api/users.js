const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const moment = require("moment");

//GET api/users
router.get("/", async (req, res) => {
  let users = await User.findAll();
  users = users.map(u => u.dataValues);
  res.status(200).send(users);
});

// POST api/users
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error);
  let user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(404).send("User already registered");

  userData = _.pick(req.body, [
    "firstName",
    "lastName",
    "email",
    "password",
    "birthday",
    "isAdmin"
  ]);
  userData.birthday = moment(req.body.birthday);
  user = User.build(userData);
  user.password = await user.generateHash(user.password);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, "id", "firstName", "email"));
});

// NOTE: for password complexity
module.exports = router;
