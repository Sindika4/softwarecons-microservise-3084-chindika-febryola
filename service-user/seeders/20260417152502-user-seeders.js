'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'budi',
        profession: 'admin',
        role: 'admin',
        email: 'budi@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'dimas',
        profession: 'student',
        role: 'student',
        email: 'dimas@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
