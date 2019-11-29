const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getAllUser);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.grantAccess('updateAny', 'user'), userController.updateUser);

module.exports = router;