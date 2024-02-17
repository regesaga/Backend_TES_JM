'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});

  Employee.associate = function(models) {
    // associations can be defined here
    Employee.hasMany(models.Education, {
      foreignKey: 'employee_id'
    });
    Employee.hasMany(models.Employee_Family, {
      foreignKey: 'employee_id'
    });
    Employee.hasOne(models.Employee_Profile, {
      foreignKey: 'employee_id'
    });
  };  
  return Employee;

};

