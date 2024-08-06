const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define("registration", {


        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },

        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
     
       
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role:{
            type: DataTypes.STRING,
            defaultValue: 'user',
            allowNull: false,
        }
      
       
        
    });
    
    return Registration;
};
