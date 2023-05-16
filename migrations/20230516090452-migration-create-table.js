'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("loginDetails","password",{
        type:Sequelize.DataTypes.CHAR,
        allowNull:false,
        defaultValue:1234,
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("loginDetails","password",{
        type:Sequelize.DataTypes.STRING,
        defaultValue:"1234",
      })
    ])
  }
};
