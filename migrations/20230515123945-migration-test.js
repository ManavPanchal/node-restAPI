module.exports = {
  async up (queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn('loginDetails', 'password', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: "1234 "
        }),
      ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("loginDetails","password")
    ])
  }
};
