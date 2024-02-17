'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('employee_profile', [{
          id: 1,
          employee_id: 1,
          place_of_birth: 'Jakarta',
          date_of_birth: new Date('1997-05-02'),
          gender: 'laki-laki',
          is_married: true,
          prof_pict: null,
          created_by: 'Admin',
          updated_by: 'Admin',
          created_at: new Date('2022-12-12'),
          updated_at: new Date('2022-12-12'),
        },
        {
          id: 2,
          employee_id: 2,
          place_of_birth: 'Sukabumi',
          date_of_birth: new Date('1996-05-02'),
          gender: 'laki-laki',
          is_married: false,
          prof_pict: null,
          created_by: 'Admin',
          updated_by: 'Admin',
          created_at: new Date('2022-12-12'),
          updated_at: new Date('2022-12-12'),
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
