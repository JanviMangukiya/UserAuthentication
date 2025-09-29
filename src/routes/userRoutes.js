const express = require('express');
const app = express.Router();
const userController = require('../controllers/userController.js');
const userValidation = require('../middleware/validation.js');
const { verifyToken } = require('../middleware/authMiddleware.js');


app.post('/register', userValidation.validationRegister, userController.register);

app.post('/login', userValidation.validationLogin, userController.login);

app.post('/role', userController.createRole);

app.get('/', verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed"});
});


module.exports = app;