'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    employee_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    level: DataTypes.ENUM('TK', 'SD','SMP','SMA','Strata 1','Starat 2','Doktor','Profesor'),
    description: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});
  Education.associate = function(models) {
    // associations can be defined here
    Education.belongsTo(models.Employee, {
      foreignKey: 'employee_id'});
  };
  return Education;
};



