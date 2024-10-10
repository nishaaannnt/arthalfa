require("dotenv").config();
const { Sequelize } = require('sequelize');

// Sequelize - basically an ORM for postgreSQL
// It helps to maintain code readable and maintainable
// also helps to avoid direct queries

// const sequelize = new Sequelize('postgres', 'postgres', , {
//   host: 'localhost',
//   dialect: 'postgres'
// });

const sequelize = new Sequelize(`postgresql://nishant:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOSTNAME}.oregon-postgres.render.com/postgres_ol80?ssl=true`)

const connection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    connection: connection,
    sequelize: sequelize
};