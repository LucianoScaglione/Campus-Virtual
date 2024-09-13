const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: true });
};