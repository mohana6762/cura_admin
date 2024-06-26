const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class techSupport extends Model {}
  techSupport.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNo: DataTypes.INTEGER,
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'techSupport',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  techSupport.associate = function (models) {
    techSupport.belongsTo(models.license, { foreignKey: 'id', as: 'tenantLicense' });
  } 

  return techSupport;
};
