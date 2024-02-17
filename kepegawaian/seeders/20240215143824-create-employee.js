'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('employees', [{
        nik: '11012',
        name: 'Budi',
        is_active: true,
        start_date: new Date('2022-12-12'),
        end_date: new Date('2029-12-12'),
        created_by: null,
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nik: '11013',
        name: 'Jarot',
        is_active: true,
        start_date: new Date('2021-09-01'),
        end_date: new Date('2028-09-01'),
        created_by: null,
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date()

      }
    ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
