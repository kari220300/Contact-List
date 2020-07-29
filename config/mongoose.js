const mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost/contacts_db');
//contacts_db is the name of the db

//to check if it is successful
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//if successful print message
db.once('open', function(){
      console.log('Successfully connected to the database');
});