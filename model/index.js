const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');
const ProfileModel = require('../model/profile.model');
const registrationModal = require('../model/registration.modal');

// Initialize Sequelize with your configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
  }
});

// Define your models
const Profile = ProfileModel(sequelize, Sequelize);
const Registration = registrationModal(sequelize, Sequelize);

sequelize.sync({ alter: true }) // 'alter: true' will modify the existing table
    .then(() => console.log('Database synced'))
    .catch((error) => console.error('Error syncing database:', error));

// Export your Sequelize instance and models
module.exports = {
  sequelize,
  Profile,
  Registration, 
  // Add other models here if needed
};