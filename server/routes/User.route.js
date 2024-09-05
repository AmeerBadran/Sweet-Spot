const express = require('express');
const {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getCountUsers
} = require('../controller/User.controller.js');

const router = express.Router();

router.get('/all/:page', getAllUsers);
router.get('/count', getCountUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser)

module.exports = router;