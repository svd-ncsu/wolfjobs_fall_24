const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ranadivevrushali31:v5Wes95M6aNZz341@cluster0.yein4.mongodb.net/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB')
})


module.exports = db;