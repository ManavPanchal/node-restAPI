const { Sequelize } = require('sequelize');
require("dotenv").config();

const db = new Sequelize('test', 'testuser', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

const connectdb = async() =>{
    
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {connectdb, db};








// console.log(schema);

/*

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres'
});

const createModelFromSchema = async (tableName) => {
  try {
    // Fetch the table schema using sequelize.query
    const schema = await sequelize.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}';`, {
      type: Sequelize.QueryTypes.SELECT
    });

    // Define the model dynamically based on the schema
    const modelAttributes = {};
    schema.forEach(column => {
      modelAttributes[column.column_name] = {
        type: getSequelizeDataType(column.data_type),
        allowNull: true // Modify as needed
      };
    });

    // Create the model using sequelize.define
    const dynamicModel = sequelize.define(tableName, modelAttributes);

    // Sync the model with the database
    await dynamicModel.sync();

    console.log(`Dynamic model for table '${tableName}' created successfully.`);
  } catch (error) {


*/