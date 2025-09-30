const express = require('express');
const app = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

app.get('/', bookController.allBook);

//app.get('/', verifyToken, bookController.allBook);

app.post('/', verifyToken, checkRole(['admin', 'author']), bookController.createBook);

app.put('/:id', verifyToken, checkRole(['admin', 'author']), bookController.updateBook);

app.delete('/:id', verifyToken, checkRole(['admin', 'author']), bookController.deleteBook);

module.exports = app;