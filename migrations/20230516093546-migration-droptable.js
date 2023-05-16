'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable("users")
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createSchema({
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
      })
    ])
  }
};
