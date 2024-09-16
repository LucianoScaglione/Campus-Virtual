const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/Users');

router.get('/', UsersControllers.getUsers);
router.get('/:id', UsersControllers.getUser);
router.post('/create', UsersControllers.createUser);
router.post('/login', UsersControllers.loginUser);
router.put('/:id', UsersControllers.updateUser);
router.delete('/:id', UsersControllers.deleteUser);

module.exports = router;