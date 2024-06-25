const jwt = require("jsonwebtoken");
const loginService = require("../services/login.services");
const rescodes = require("../utility/rescodes");
const config = require("../config/vars");
const values = require("../utility/getValues");
const emailSystem = require("../utility/email");
const path = require("path");

const login = {};

login.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await loginService.checkUser(email);
    if (!emailExist) {
      res.response = {
        code: 404,
        data: { status: "Error", message: rescodes?.noUser },
      };
      return next();
    }
    const depass = jwt.verify(emailExist.password, config.app.accesstoken);
    if (depass.password !== password) {
      res.response = {
        code: 401,
        data: { status: "Error", message: rescodes?.checkCred },
      };
      return next();
    }
    const user = { name: email, id: emailExist.id };
    const accessToken = await values.generateAccessToken(user);
    const updateToken = await loginService.updateUserToken(emailExist.id , accessToken)
    // const refreshToken = jwt?.sign(user, config?.app?.refreshtoken);
    //   const expiresAt = new Date();
    //   expiresAt.setDate(expiresAt.getDate() + 1);
    //   await loginService.adminRefreshToken({
    //       userId: user.id,
    //       token: refreshToken,
    //       expiresAt: expiresAt,
    //   });
    res.response = {
      code: 200,
      data: {
        status: "Ok",
        data: {
          id: emailExist.id,
          accessToken,
          //   refreshToken,
          expiresIn: 3600000,
        },
        message: rescodes?.loginSuc,
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

// User resetpassword
login.resetPassword = async (req, res, next) => {
  try {
    const resetCode = req.query.resetCode;
    const { newPassword } = req.body;
    const checklink = await loginService.checkPasswordChangeRequest(resetCode);
    if (checklink && Object.keys(checklink)?.length) {
      const encryptedPassword = jwt.sign(
        { password: newPassword },
        config.app.accesstoken
      );
      const updatePass = await loginService.updateUserPassword(
        checklink?.user_id,
        encryptedPassword
      );
      const deleteReq = await loginService.deletePasswordChangeRequest(
        resetCode
      );
      if (deleteReq && updatePass) {
        res.response = {
          code: 200,
          data: { status: "ok", message: rescodes?.passRS },
        };
        return next();
      }
    } else {
      await loginService.deletePasswordChangeRequest(resetCode);
      res.response = {
        code: 404,
        data: { status: "Error", message: rescodes?.resetCode },
      };
      return next();
    }
    return "";
  } catch (err) {
    res.response = {
      code: 500,
      data: { status: "Error", message: rescodes?.error },
    };
    return next();
  }
};

// User forgotpassword
login.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req?.body || {};
    const userExist = await loginService.checkUser(email);
    if (!userExist) {
      res.response = {
        code: 404,
        data: { status: "Error", message: rescodes?.noUser },
      };
      return next();
    }
    const reset = `${config.app.frontendURL}login/reset-password`;
    const subject = "Reset Password Request";
    const templateData = { firstName: userExist.firstName, resetLink: reset };
    const templateFilePath = path.join(__dirname, "../views/resetMail.ejs");
    const result = await emailSystem.sendEmail(
      email,
      subject,
      templateFilePath,
      templateData
    );
    if (result === "success") {
      res.response = {
        code: 200,
        data: { status: "Ok", message: rescodes?.mailSentF },
      };
      return next();
    }
    return "";
  } catch (err) {
    res.response = {
      code: 500,
      data: { status: "Error", message: rescodes?.wentWrong },
    };
    return next();
  }
};

// User generate Refresh Token
login.adminRefreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const checkTokenExist = await loginService.adminTokenExist(token);
    if (!checkTokenExist) {
      res.response = {
        code: 400,
        data: { status: "Error", message: rescodes?.tokenAldel },
      };
      return next();
    }
    const refreshTokenUser = jwt.verify(token, config.app.refreshtoken);
    const existQuery = await loginService.findAdminUserByEmailAndId(
      refreshTokenUser?.name,
      refreshTokenUser?.id
    );
    if (!existQuery || !Object.keys(existQuery)?.length) {
      res.response = {
        code: 401,
        data: { status: "Error", message: rescodes?.unAuthorized },
      };
      return next();
    }
    const getId = await loginService.findRefreshTokensByAdminUserId(
      existQuery?.dataValues?.id
    );
    const result = getId.map((val) => val?.dataValues?.token);
    if (!result?.includes(token)) {
      res.response = {
        code: 403,
        data: { status: "Error", message: rescodes?.forbidden },
      };
      return next();
    }
    const users = { name: refreshTokenUser?.name, id: refreshTokenUser?.id };
    const accessToken = await values.generateAccessToken(users);
    res.response = {
      code: 200,
      data: { status: "Ok", data: { accessToken, expiresIn: 3600000 } },
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

// User logout
login.logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    const checkTokenExist = await loginService.AdminTokenExist(token);
    if (!checkTokenExist) {
      res.response = {
        code: 400,
        data: { status: "Error", message: rescodes?.tokenAldel },
      };
      return next();
    }
    const deletedRows = await loginService.deleteAdminRefreshToken(token);
    if (deletedRows) {
      res.response = {
        code: 200,
        data: { status: "Ok", message: rescodes?.logout },
      };
      return next();
    }
    return "";
  } catch (err) {
    res.response = {
      code: 500,
      data: { status: "Error", message: rescodes?.wentWrong },
    };
    return next();
  }
};



module.exports = login;
