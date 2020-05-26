require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect( process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const friendsRouter = require('./routes/friends')
app.use('/friends', friendsRouter)

app.listen(2200, () => console.log('Server Started'));

 