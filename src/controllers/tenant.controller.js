const rescodes = require("../utility/rescodes");
const axios = require("axios")

const tenant = {};

tenant.createTenant = async (req, res, next) => {
  try {
    const tenantData = req.body;
    const response = await axios.post('http://localhost:8002/api/v1/tenant', tenantData);
    if (response.status === 201 && response.data) {
      res.response = {
        code: 201,
        message: response.data.message || 'Tenant created successfully',
      };
    }
    return next();
  } catch (err) {
    res.response = {
      code: 500,
      data: { status: "Error", message: rescodes?.wentWrong },
    };
    return next();
  }
};

tenant.getTenants = async (req, res, next) => {
    try {
      const response = await axios.get('http://localhost:8002/api/v1/tenant/tenantlist');
      if (response.status === 201 && response.data) {
        res.response = {
          code: 201,
          data: { status: 'Ok', data: response.data.data  },
        };
      }
      return next();
    } catch (err) {
      res.response = {
        code: 500,
        data: { status: "Error", message: rescodes?.wentWrong },
      };
      return next();
    }
};

module.exports = tenant;
