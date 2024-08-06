const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Profile = sequelize.define("Profile", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Add unique constraint
        },
        profession: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        profilePic: {
            type: DataTypes.STRING,
        }
    }, {
        // Optionally, specify table name and additional options
        tableName: 'Profiles',
        timestamps: false // Disable automatic timestamp columns
    });

    return Profile;
};
