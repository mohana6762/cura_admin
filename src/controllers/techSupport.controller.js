const rescodes = require("../utility/rescodes");
const techService = require("../services/techSupport.service");
const techSupport = {};

techSupport.createTechSupport = async (req, res) => {
  try {
    const { name, email, phoneNo } = req.body;
    const existTech = await techService.existTech(email);
    if (existTech) {
      return res.status(400).json({
        code: 400,
        message: rescodes?.techAlreadyExist,
      });
    }
    await techService.createTechSupport(name, email, phoneNo);
    return res.status(200).json({
      code: 200,
      message: rescodes?.tenantCreate,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      data: { status: "Error", message: rescodes?.wentWrong },
    });
  }
};

techSupport.getTechSupport = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.response = {
      code: 200,
      message: rescodes?.loginSuc,
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
