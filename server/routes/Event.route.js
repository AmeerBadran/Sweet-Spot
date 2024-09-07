const express = require('express');
const { createEvent, getAllEvents, getEventById, getCountEvents, deleteEventById, updateEventById, getClosestEvent } = require('../controller/Event.controller');
const { verifyAdminToken } = require('../middleware/verifyAdminToken')
const router = express.Router();

router.post('/', verifyAdminToken, createEvent);
router.get('/closestEvent', getClosestEvent);
router.get('/all/:page/:filter', getAllEvents);
router.get('/count/:filter', getCountEvents);
router.get('/:id', verifyAdminToken, getEventById);
router.put('/update/:id', verifyAdminToken, updateEventById);
router.delete('/delete/:id', verifyAdminToken, deleteEventById);

module.exports = router;
