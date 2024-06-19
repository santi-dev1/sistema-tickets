let currentTicketNumber = 1;
let tickets = [];
let ticketsByDay = {};

const getNextTicket = () => {
  const ticket = { number: currentTicketNumber++ };
  tickets.push(ticket);

  const today = new Date().toISOString().split('T')[0];
  if (!ticketsByDay[today]) {
    ticketsByDay[today] = [];
  }
  ticketsByDay[today].push(ticket);

  return ticket;
};

const getLastThreeTickets = () => {
  return tickets.slice(-3);
};

const getTicketsByDay = () => {
  return ticketsByDay;
};

module.exports = {
  getNextTicket,
  getLastThreeTickets,
  getTicketsByDay,
};
