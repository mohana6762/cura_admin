const rescodes = require("../utility/rescodes");
const adminService = require("../services/admin.service");

const admin = {};

admin.getAdmin = async (req, res, next) => {
  try {
    const id = req.user.id;
    const getAdmin = await adminService.getAdmin(id);
    if (!getAdmin) {
      res.response = {
        code: 404,
        message: rescodes?.notFound,
      };
      return next();
    }
    res.response = {
      code: 200,
      data: { status: 'Ok', data: getAdmin.dataValues },
    };
    return next();
  } catch (err) {
    res.response = {
      code: 500,
      data: { status: "Error", message: rescodes?.wentWrong },
    };
    return next();
  }
};

module.exports = admin;
