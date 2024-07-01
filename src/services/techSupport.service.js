const db = require('../../model/index');

const techSupportService = {};

techSupportService.existTech = async (email) => {
  return db.techSupport.findOne({
    where: {
      email: email,
    },
  });
};

techSupportService.createTechSupport = async (data) => {
  data.isTrash = false;
  return db.techSupport.create(data);
};

techSupportService.getTechnician = async (id) => {
  return db.techSupport.findByPk(id);
};

techSupportService.getAllTechnician = async (filters) => {
  try {
    const whereClause = {};

    if (filters.id !== undefined) {
        whereClause.id = filters.id;
    }

    if (filters.name !== undefined) {
        whereClause.name = { [Op.iLike]: `%${filters.name}%` };
    }

    if (filters.email !== undefined) {
        whereClause.email = { [Op.iLike]: `%${filters.email}%` };
    }

    const tenants = await db.techSupport.findAll({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,  // Use undefined to fetch all tenants if whereClause is empty
    });
    return tenants;
} catch (error) {
    throw new Error('Error fetching tenants: ' + error.message);
}
}

techSupportService.updateTechnician = async (id, data) => {
  return db.techSupport.update(
    data,
    {
    where: {
      id
    },
  });
};

techSupportService.deleteTechnician = async (id) => {
  return db.techSupport.destroy({
    where: {
      id
    }
  });
};

module.exports = techSupportService;