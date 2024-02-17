'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Employee_Profile = sequelize.define('Employee_Profile', {
    employee_id: DataTypes.INTEGER,
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.ENUM('laki-laki', 'perempuan'),
    is_married: DataTypes.BOOLEAN,
    prof_pict: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE
  }, {});
  Employee_Profile.associate = function(models) {
    // associations can be defined here
    Employee_Profile.belongsTo(models.Employee, {
      foreignKey: 'employee_id'});
  };
  return Employee_Profile;
};





