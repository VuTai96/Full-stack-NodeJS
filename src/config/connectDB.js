
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('de0jbjq1ceobn8', 'onvvdhqupljkwk', "29f43913f91e0bcbedf2db7eef343f5c936f0634d189182943942896b89ceb82", {
    host: "ec2-34-227-135-211.compute-1.amazonaws.com",
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;