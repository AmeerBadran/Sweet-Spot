const express = require('express')
const router = express.Router()
const { sendContactForm, getContactData } = require('../controller/contact.controller')

router.post('/:id', sendContactForm)
router.get('/', getContactData)

module.exports = router