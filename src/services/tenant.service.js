const { Op } = require('sequelize');
const db = require('../../model/index')
const tenantService = {};

tenantService.findTenant = async (email) => {
    return db.tenant.findOne({
        where: {
            email
        }
    })
}

// tenantService.getAllTenants = async (filters) => {
//     try {
//       const whereClause = [];
  
//       if (filters.id) {
//         whereClause.push({ id: filters.id });
//       }
  
//       if (filters.name) {
//         whereClause.push({ name: { [Op.iLike]: `%${filters.name}%` } });
//       }
  
//       if (filters.email) {
//         whereClause.push({ email: { [Op.iLike]: `%${filters.email}%` } });
//       }
  
//       if (filters.search && filters.search.length > 0) {
//         const searchConditions = [];
//         if (!isNaN(filters.search)) {
//           searchConditions.push({ id: filters.search });
//         }
//         searchConditions.push(
//           { name: { [Op.iLike]: `%${filters.search}%` } },
//           { email: { [Op.iLike]: `%${filters.search}%` } }
//         );
  
//         whereClause.push({
//           [Op.or]: searchConditions,
//         });
//       }
  
//       const tenants = await db.tenant.findAll({
//         where: {
//           [Op.and]: whereClause,
//         },
//       });
  
//       return tenants;
//     } catch (error) {
//       throw new Error('Error fetching tenants: ' + error.message);
//     }
//   };
  

tenantService.getAllTenants = async (filters) => {
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

        if (filters.status !== undefined) {
            whereClause.status = filters.status;
        }

        // if (filters.search && filters.search.length > 0) {
        //     const searchConditions = [];
        //     if (!isNaN(filters.search)) {
        //         searchConditions.push({ id: filters.search });
        //     }
        //     searchConditions.push(
        //         { name: { [Op.iLike]: `%${filters.search}%` } },
        //         { email: { [Op.iLike]: `%${filters.search}%` } }
        //     );

        //     whereClause[Op.or] = searchConditions;
        // }

        // Fetch tenants from the database
        const tenants = await db.tenant.findAll({
            where: Object.keys(whereClause).length > 0 ? whereClause : undefined,  // Use undefined to fetch all tenants if whereClause is empty
        });
        return tenants;
    } catch (error) {
        throw new Error('Error fetching tenants: ' + error.message);
    }
};
  
tenantService.getTenantById = async (id) => {
  return db.tenant.findByPk(id);
};

tenantService.createTenant = async (tenantData) => {
    tenantData.status = 'Active';
    tenantData.isTrash = false;
  return db.tenant.create(tenantData)  
};
  
tenantService.updateTenant = async (tenantId, tenantData) => {
    const updateTenant = await db.tenant.update(
        tenantData,
        {
            where: {
                id: tenantId
            }
        }
    );
    return updateTenant;
};
  
tenantService.deleteTenant = async (tenantId) => {
    return db.tenant.destroy({
        where: {
            id: tenantId
        }
    })
};

module.exports = tenantService;