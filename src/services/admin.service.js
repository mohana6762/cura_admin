const db = require('../../model/index');

const adminService = {};

adminService.getAdmin = async (id) => {
  return db.admin.findOne({
    where: {
      id
    },
  });
};

module.exports = adminService;