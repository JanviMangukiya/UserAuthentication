const express = require('express');
const app = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../middleware/validation');
const { verifyToken } = require('../middleware/authMiddleware');
const { successHandle } = require('../helper/helper');

app.post('/register', userValidation.validationRegister, userController.register);

app.post('/login', userValidation.validationLogin, userController.login);

app.post('/google-login', userController.googleLogin);

app.post('/google-logout', verifyToken, userController.googleLogout);

app.post('/role', userController.createRole);

app.get('/', verifyToken, (req, res) => {
    return successHandle('', res, "Protected route accessed", '');
});

module.exports = app;