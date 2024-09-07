const express = require('express')
const router = express.Router()
const { signUp, logIn, logOut, refresh, verifyCode } = require('../controller/Auth.controller')

router.post('/signUp', signUp)
router.post('/logIn', logIn)
router.post('/refresh', refresh)
router.post('/logOut', logOut)
router.post('/verifyCode', verifyCode);
module.exports = router