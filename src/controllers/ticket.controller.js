const rescodes = require("../utility/rescodes");
const ticketService = require("../services/ticket.service");
const ticket = {};

ticket.createticket = async (req, res, next) => {
  try {
    const {user_id, tech_id, category, issueTitle, description} = req.body;
    await ticketService.createTicket({user_id, tech_id, category, issueTitle, description});
    res.response = {
      code: 200,
      data: {
        status: 'Ok',
        message: rescodes?.ticketCreate,
      },
    };
    return next();
  } catch (err) {
    res.response = {
      code: 500,
      message: rescodes?.wentWrong,
    };
    return next();
  }
};

ticket.getTicketById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await ticketService.getTicket(id);
    if (!ticket) {
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
      data: { status: "Ok", data: ticket },
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

ticket.getAllTickets = async (req, res, next) => {
  try {
    //filter
    const tech = await ticketService.getAllTickets();
    if (!tech) {
      res.response = {
        code: 404,
        data: {
          status: 'Error',
          message: 'No Tickets',
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

ticket.updateTechSupport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await ticketService.updateTicket(id, data);
    res.response = {
      code: 200,
      data: {
        status: 'Ok',
        message: rescodes?.updateTicket,
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

ticket.deleteTechSupport = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ticketService.deleteTechnician(id);
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

module.exports = ticket;
