'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('education', [{
          employee_id: 1,
          name: 'SMKN 7 Jakarta',
          level: 'SMA',
          description: 'Sekolah Menengah Atas',
          created_by: 'Admin',
          updated_by: 'Admin',
          created_at: new Date('2022-12-12'),
          updated_at: new Date('2022-12-12')
        },
        {
          employee_id: 2,
          name: 'Universitas Negri Jakarta',
          level: 'Strata 1',
          description: 'Sarjana',
          created_by: 'Admin',
          updated_by: 'Admin',
          created_at: new Date('2022-12-12'),
          updated_at: new Date('2022-12-12')
        },], {});
    
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
