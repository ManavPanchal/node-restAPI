
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("loginDetails","isActive",{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("loginDetails","isActive")
    ])
  }
};
