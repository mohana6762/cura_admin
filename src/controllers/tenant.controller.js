const rescodes = require("../utility/rescodes");
const axios = require("axios")
const tenantService = require("../services/tenant.service")

const tenant = {};

tenant.createTenant = async (req, res, next) => {
  try {
    const tenantData = req.body;
    const {email} = req.body;
    const userExist = await tenantService.findTenant(email);
    if(userExist){
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.techAlreadyExist,
        },
      };      
      return next();
    }
    await tenantService.createTenant(tenantData);
      res.response = {
        code: 201,
        data: {
          status: 'ok',
          message: rescodes?.tenantCreate,
        },
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

tenant.getTenants = async (req, res, next) => {
    try {
      const { id, name, email, search, status } = req.query;
      const filters = { id, name, email, search, status };
      const tenants = await tenantService.getAllTenants(filters);
        res.response = {
          code: 201,
          data: { status: 'Ok', data: tenants  },
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

tenant.getTenantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tenant = await tenantService.getTenantById(id);
    if(!tenant){
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.noUser,
        },
      }
      return next();
    }
      res.response = {
        code: 201,
        data: { status: 'Ok', data: tenant  },
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

tenant.updateTenantDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tenantData = req.body
    const tenant = await tenantService.getTenantById(id);
    if(!tenant){
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.noUser,
        },
      }
      return next();
    }
    await tenantService.updateTenant(tenant.id, tenantData)
      res.response = {
        code: 201,
        data: {
          status: 'ok',
          message: rescodes?.updateTenant,
        },
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

tenant.deleteTenantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tenant = await tenantService.getTenantById(id);
    if(!tenant){
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.noUser,
        },
      }
      return next();
    }
    await tenantService.deleteTenant(tenant.id);
      res.response = {
        code: 201,
        data: { status: 'Ok', message: rescodes?.deleteTenant  },
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

module.exports = tenant;
