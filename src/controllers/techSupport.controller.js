const rescodes = require("../utility/rescodes");
const techService = require("../services/techSupport.service");
const techSupport = {};

techSupport.createTechSupport = async (req, res, next) => {
  try {
    const {name, email, phoneNo} = req.body;
    const existTech = await techService.existTech(email);
    if (existTech) {
      res.response = {
        code: 400,
        data: {
          status: 'Error',
          message: rescodes?.techAlreadyExist,
        },
      };
      return next();
    }
    await techService.createTechSupport({name, email, phoneNo});
    res.response = {
      code: 200,
      data: {
        status: 'Ok',
        message: rescodes?.techSupportCreate,
      },
    };
    return next();
  } catch (err) {
    console.log(err);
    res.response = {
      code: 500,
      message: rescodes?.wentWrong,
    };
    return next();
  }
};

techSupport.getTechSupport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tech = await techService.getTechnician(id);
    if (!tech) {
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.noUser,
        },
      };
      return next();
    }
    res.response = {
      code: 200,
      data: { status: "Ok", data: tech },
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

techSupport.getAllTechSupport = async (req, res, next) => {
  try {
    const { id, name, email } = req.query;
    const filters = { id, name, email };
    const tech = await techService.getAllTechnician(filters);
    if (!tech) {
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.noUser,
        },
      };
      return next();
    }
    res.response = {
      code: 200,
      data: { status: "Ok", data: tech },
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
    const { id } = req.params;
    const data = req.body;
    const tech = await techService.getTechnician(id);
    if (!tech) {
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: rescodes?.noUser,
        }
      };
      return next();
    }
    await techService.updateTechnician(id, data);
    res.response = {
      code: 200,
      data: {
        status: 'Ok',
        message: rescodes?.updateTechSupport,
      }
    };
    return next();
  } catch (err) {
    console.log(err);
    res.response = {
      code: 500,
      data: { status: "Error", message: rescodes?.wentWrong },
    };
    return next();
  }
};

techSupport.deleteTechSupport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tech = await techService.getTechnician(id);
    if (!tech) {
      res.response = {
        code: 404,
        data: {
          status: 'Ok',
          message: rescodes?.noUser,
        }
      };
      return next();
    }
    await techService.deleteTechnician(id);
    res.response = {
      code: 200,
      data: {
        status: 'Ok',
        message: rescodes?.deleteTechSupport,
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

module.exports = techSupport;
