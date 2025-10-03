require('dotenv').config();
const express = require('express');
const app = express();

require('./db');
app.use(express.json());

const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');

app.use('/user', userRoutes);
app.use('/book', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});