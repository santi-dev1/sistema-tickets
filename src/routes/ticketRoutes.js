const express = require('express');
const { getNextTicket, getLastThreeTickets, getTicketsByDay } = require('../controllers/ticketController.js');

const router = express.Router();

router.get('/next', (req, res) => {
    const nextTicket = getNextTicket();
    res.json(nextTicket);
});

router.get('/last-three', (req, res) => {
    const lastThreeTickets = getLastThreeTickets();
    res.json(lastThreeTickets);
});

router.get('/by-day', (req, res) => {
    const ticketsByDay = getTicketsByDay();
    res.json(ticketsByDay);
});

module.exports = router;