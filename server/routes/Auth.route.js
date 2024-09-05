const express = require('express')
const router = express.Router()
const { signUp, logIn, logOut, refresh } = require('../controller/Auth.controller')

router.post('/signUp', signUp)
router.post('/logIn', logIn)
router.post('/refresh', refresh)
router.post('/logOut', logOut)

module.exports = router