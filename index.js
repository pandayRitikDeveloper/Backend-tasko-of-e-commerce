require('dotenv').config({ path: 'config.env' });
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/productRoute');
const app = express();
app.use(express.json());
const mongoString = process.env.DATABASE_URL;
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
mongoose.connect(mongoString,{useNewUrlParser: true})
.then((res)=> console.log(">>>>>DB connected"))
.catch((err)=> console.error("Connect fail"));

// mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('err', (err) => {
  console.log(err);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = server;