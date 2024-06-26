const rescodes = require("../utility/rescodes");

const techSupport = {};

techSupport.createTechSupport = async (req, res, next) => {
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
