const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class tenant extends Model {}
  tenant.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNo: DataTypes.BIGINT,
      website: DataTypes.STRING,
      buildingName: DataTypes.STRING,
      address: DataTypes.STRING,
      unit: DataTypes.INTEGER,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      status: DataTypes.ENUM('Active', 'Suspended', 'Pending Termination', 'Terminated'),
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'tenant',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  
  tenant.associate = function (models) {
    tenant.belongsTo(models.license, { foreignKey: 'user_id', as: 'tenantLicense' });
    tenant.belongsTo(models.tickets, { foreignKey: 'user_id', as: 'tenantTickets' });
  };
  
  return tenant;
};
