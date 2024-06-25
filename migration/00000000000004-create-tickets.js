const config = require("../src/config/vars");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "license",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        category: {
          type: Sequelize.STRING,
        },
        issueTitle: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM("Open", "Closed", "In Progress"),
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
    await queryInterface.dropTable("license");
  },
};
