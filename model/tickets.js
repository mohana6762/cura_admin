const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class tenant extends Model {}
  tenant.init(
    {
      user_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      issueTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.ENUM("Open", "Closed", "In Progress"),
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'tenant',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  
  return admin;
};
