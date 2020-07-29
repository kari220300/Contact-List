const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine' , 'ejs'); // setting value for a property
app.set('views', path.join(__dirname , 'views') );
app.use(express.urlencoded()); //parser

app.use(express.static('assets'));


//middleware1
//app.use(function(req, rep , next){
 //      console.log('Middleware1 called ');
    //   next();  //without this it wont load kari's contact list page
                //i.e wont go to the next page
//});

//middleware2
 //app.use(function(req, res, next){
  //console.log('Middleware2 called ');
  //next();
 //});

var contactlist = [
      {
          name : "Priya",
          phone: "23456"
      },
      {
        name : "Seema" ,
        phone: "45678" 
      },
      {
        name : "Sanjeev" ,
        phone: "7879"
      },
      
    
]

app.get('/',function(req , res){
 
    Contact.find({}, function(err, contacts){ //find is used for fetching data
      if(err)                                 //{}:here we can pass name: 'kari' to get contacts having name kari
      {
        console.log('Error in fetching contact');
        return;
      }
      return res.render('home' , {
        title : "Kari's Contact List " ,
        contact: contacts
    });

    });
});
 
app.get('/practice', function(req, res){ 
           return res.render('practice');
          {title : "Lest play with ejs" } 
});

app.post('/create-contact', function(req, res){

  //contactlist.push({
        //name: req.body.name,
        //phone : req.body.phone

   Contact.create({   //takes name and phone cuz they are part of the schema
          name: req.body.name,
          phone: req.body.phone

   },function(err, newContact){
      if(err)
      {
        console.log('Error in creating the contact');
        return;
      }
      console.log('******* ', newContact);
      return  res.redirect('back');
   });

});

app.listen(port , function(err){
  if(err)
  {
     console.log('Error in running server ', err);
  }
 console.log('Express server is running on port ', port);
});
