const { Sequelize, DataTypes, Model } = require("sequelize");
const { db } = require("./db");
const bcrypt = require("bcrypt");

const loginData = db.define("loginDetails", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  myDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

const User = db.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: {
      type: Sequelize.STRING,
      validate: {
        is: /\$[a-z0-9-]+\$[0-9A-Za-z./+=,$-]+$/,
      },
    },
  },
  {
    timestamps: false,
  }
);

User.beforeValidate("encryptPass", async (model) => {
  const pass = await bcrypt.hash(model.password, 10);
  model.password = pass;
});

module.exports = { loginData, User };
