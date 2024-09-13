const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Publications', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: true });
};