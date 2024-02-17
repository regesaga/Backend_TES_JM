'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_profile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      place_of_birth: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date_of_birth: {
        allowNull: true,
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM('laki-laki', 'perempuan'), 
        allowNull: false,// Mengisi data enum dengan "laki-laki" dan "perempuan"
      },
      is_married: {
        type: Sequelize.BOOLEAN
      },
      prof_pict: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_profile');
  }
};