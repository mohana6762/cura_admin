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
      modelName: 'license',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  
  return techSupport;
};
