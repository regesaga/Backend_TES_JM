const Sequelize = require('sequelize');

   const sequelize = new Sequelize('data_kepegawaian', 'regesagasetadmin', 'regesaga', {
     host: 'localhost',
     dialect: 'postgres',
   });

   module.exports = sequelize;