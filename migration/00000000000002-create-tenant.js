const config = require('../src/config/vars');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tenant',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        phoneNo: {
          type: Sequelize.INTEGER,
        },
        website: {
          type: Sequelize.STRING,
        },
        buildingName: {
          type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        unit: {
            type: Sequelize.INTEGER,
        },
        postalCode: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        licenseId: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.ENUM('Active', 'Suspended', 'Pending Termination', 'Terminated'),
        },
        isTrash: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      {
        schema: config.db.schema,
        freezeTableName: true,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tenant');
  },
};
