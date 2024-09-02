const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CurriculumUnit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assignedTeacher: {
      type: DataTypes.STRING
    }
  }, { timestamps: true });
};