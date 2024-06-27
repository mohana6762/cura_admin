const rescodes = require("../utility/rescodes");
const techService = require("../services/techSupport.service");
const techSupport = {};

techSupport.createTechSupport = async (req, res) => {
  try {
    const { name, email, phoneNo } = req.body;
    const existTech = await techService.existTech(email);
    if (existTech) {
      res.response = {
        code: 400,
        message: rescodes?.techAlreadyExist,
      };
    }
    await techService.createTechSupport(name, email, phoneNo);
    res.response = {
      code: 200,
      message: rescodes?.tenantCreate,
    };
  } catch (err) {
    res.response = {
      code: 500,
      message: rescodes?.wentWrong,
    };
    return next();
  }
};

techSupport.getTechSupport = async (req, res, next) => {
  try {
    const id = req.params;
    const tech = await techService.getTechnician(id);
    if (!tech) {
      res.response = {
        code: 404,
        message: rescodes?.notFound,
      };
      return next();
    }
    res.response = {
      code: 200,
      data: { status: "ok", data: tech },
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

techSupport.updateTechSupport = async (req, res, next) => {
  try {
    const id = req.params;
    const data = req.body;
    const tech = await techService.getTechnician(id);
    if (!tech) {
      res.response = {
        code: 404,
        message: rescodes?.notFound,
      };
      return next();
    }
    await techService.updateTechnician(id, data);
    res.response = {
      code: 200,
      message: rescodes?.updateTechSupport
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

techSupport.deleteTechSupport = async (req, res, next) => {
  try {
    const id = req.params;
    const tech = await techService.getTechnician(id);
    if (!tech) {
      res.response = {
        code: 404,
        message: rescodes?.notFound,
      };
      return next();
    }
    await techService.deleteTechnician(id);
    res.response = {
      code: 200,
      message: rescodes?.deleteTechSupport,
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

module.exports = techSupport;
