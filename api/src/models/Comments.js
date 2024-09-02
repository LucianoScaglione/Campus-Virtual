const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: true });
};