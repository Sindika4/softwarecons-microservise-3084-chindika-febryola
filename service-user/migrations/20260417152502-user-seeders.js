'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'andi',
        profession: 'administrator',
        role: 'admin',
        email: 'andi@mail.com',
        password: await bcrypt.hash('rahasia123', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'sari',
        profession: 'pelajar',
        role: 'student',
        email: 'sari@mail.com',
        password: await bcrypt.hash('rahasia123', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};