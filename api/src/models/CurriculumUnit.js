const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CurriculumUnit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
    },
    inviteCode: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: true });
};