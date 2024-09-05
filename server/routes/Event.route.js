const express = require('express');
const { createEvent, getAllEvents, getEventById, getCountEvents, deleteEventById, updateEventById } = require('../controller/Event.controller');
const router = express.Router();

router.post('/', createEvent);
router.get('/all/:page', getAllEvents);
router.get('/count', getCountEvents);
router.get('/:id', getEventById);
router.put('/update/:id', updateEventById)
router.delete('/delete/:id', deleteEventById)

module.exports = router;
