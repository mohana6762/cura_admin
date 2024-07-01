const db = require('../../model/index');

const ticketService = {};

ticketService.createTicket = async (data) => {
  data.status = "Open";
  data.isTrash = false;
  return db.tickets.create(data);
};

ticketService.getTicket = async (id) => {
  return db.tickets.findByPk(id);
};

ticketService.getAllTickets = async () => {
    return db.tickets.findAll({});
}

ticketService.updateTicket = async (id, data) => {
  return db.tickets.update(
    data,
    {
    where: {
      id
    },
  });
};

ticketService.deleteTicket = async (id) => {
  return db.tickets.destroy({
    where: {
      id
    }
  });
};

module.exports = ticketService;