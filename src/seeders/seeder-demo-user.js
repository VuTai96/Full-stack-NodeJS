'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //tạo 1 row mới
    // return queryInterface.bulkInsert('Users', [{
    //   email: 'admin@example.com',
    //   password: '123456',
    //   firstName: 'Tài',
    //   lastName: 'Vũ Văn',
    //   address: 'Nghe An',
    //   gender: 1,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }]);
    //đổi type của gender sang thành Sequelize.STRING
    return Promise.all([
      queryInterface.changeColumn('users', 'image', {
        type: Sequelize.BLOB('medium'),
        allowNull: true,
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // return Promise.all([
    //   queryInterface.changeColumn('your table name ', 'name', {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   })
    // ])
  }
};
