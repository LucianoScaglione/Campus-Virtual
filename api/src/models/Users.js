const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    dni: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.TEXT
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    ranks: {
      type: DataTypes.ENUM('Student', 'Teacher', 'Admin'),
      allowNull: false,
      defaultValue: 'Student'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: true });
};