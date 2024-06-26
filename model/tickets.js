const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {}
  tickets.init(
    {
      user_id: DataTypes.INTEGER,
      tech_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      issueTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.ENUM("Open", "Closed", "In Progress"),
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'tickets',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );

  tickets.associate = function (models) {
    tickets.hasMany(models.tenant, { foreignKey: 'user_id', as: 'tenantTickets' });
    tickets.hasMany(models.techSupport, { foreignKey: 'tech_id', as: 'tenantTechSupport' });
  }
  
  return tickets;
};
