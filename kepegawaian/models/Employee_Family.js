'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Employee_Family = sequelize.define('Employee_Family', {
    employee_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    job: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    religion: DataTypes.ENUM('Islam', 'Katolik','Budha','Protestan','Konghucu'),
    is_life: DataTypes.BOOLEAN,
    is_divorced: DataTypes.BOOLEAN,
    relation_status: DataTypes.ENUM('Suami', 'Istri','Anak','Anak Sambung'),
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE
  }, {});
  Employee_Family.associate = function(models) {
    // associations can be defined here
    Employee_Family.belongsTo(models.Employee, {
      foreignKey: 'employee_id'});
  };
  return Employee_Family;
};






