const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://harshchaudhari882:S0wDrxspsjyELBHZ@cluster0.ycsoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB')
})


module.exports = db;