const express = require('express');
const app = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');


// app.post('/', bookController.createBook);

// app.get('/', bookController.allBook);

// app.get('/', bookController.bookOffset);

// app.get('/:id', bookController.getId);

// app.put('/:id', bookController.updateBook); 

// app.delete('/:id', bookController.deleteBook);

app.get('/', verifyToken, bookController.allBook);

app.post('/', verifyToken, checkRole(['admin', 'author']), bookController.createBook);

app.put('/:id', verifyToken, checkRole(['admin', 'author']), bookController.updateBook);

app.delete('/:id', verifyToken, checkRole(['admin', 'author']), bookController.deleteBook);

module.exports = app;