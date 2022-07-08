'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin User",
          email: "admin@example.app",
          password_hash: "$2a$08$QkPpPHgYyxPcHlqLIIqCKuZ3NYFis7FoMDBLmceXV7/D/W3CBfMqG",
          roles: "admin",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Manager User",
          email: "manager@example.app",
          password_hash: "$2a$08$QkPpPHgYyxPcHlqLIIqCKuZ3NYFis7FoMDBLmceXV7/D/W3CBfMqG",
          roles: "manager",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Dev User",
          email: "dev@example.app",
          password_hash: "$2a$08$QkPpPHgYyxPcHlqLIIqCKuZ3NYFis7FoMDBLmceXV7/D/W3CBfMqG",
          roles: "developer",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
