//***********Importing All the required Modules Here::
var express = require('express'),
    bodyparser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    flash = require('connect-flash'),
    database = require('./api/config/database-schema.js');
    






//**********Creating Server for Application::
var app=express();










//**********Creating Routes for Application::(Setting Up routes for all the core functionalities)
var routes={};
routes['User_Route']=require('./api/routes/User_Route.js');










//*********Creating Applicatio Level Configurations
app.set('port',process.env.PORT||3000)//Setting Port,If no port then it goes for '3000'
app.use(express.static('app'));//Loading Static Route after listening to port
app.use(bodyparser.json());//Used for Collecting JSON data from Requests
app.use(cookieparser());
app.use(session({secret:'this is the secret'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//app.use(app.router);









//***Creating Port
app.listen(3000,function(){
  console.log("Server is running on port 3000");
});










//********Routes Withrespect to API Calls 
app.post('/submitForm', routes['User_Route']['submitEnquiry']);
app.post('/signUp',routes['User_Route']['signUpUser']);
app.get('/model',routes['User_Route']['auth'],routes['User_Route']['showModel']);
app.post('/login',routes['User_Route']['logInThroughPassport'],routes['User_Route']['logInUser']);
app.get('/loggedIn',routes['User_Route']['loggedIn']);
app.post('/logOut',routes['User_Route']['logOut']);
//app.post('/login',routes['User_Route']['logInUser']);



























/*
var express = require('express'),
app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());//For parsing the request's body

/*
var nodemailer=require('nodemailer');


var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "gmail",
   auth: {
       user: "sreeharsha.lanka@gmail.com",
       pass: "9866856573"
   }
});


var callMail=function(){
       smtpTransport.sendMail({
       from: "HarshaNVSSS.Lanka@cognizant.com", // sender address
       to: "Pranathi.Dharmareddy@cognizant.com", // comma separated list of receivers
       subject: "Hello", // Subject line
       text: "Hello world" // plaintext body
    }, function(error, response){
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + response.message);
       }
    });
}


*/








/*

//Importing mongoose to query the mongodb easily
var mongoose=require('mongoose');
mongoose.connect("mongodb://10.241.170.33:27017/user_info",function(error){
  if(error){
    console.log("This is connection Error"+error);
  }
});


// Mongoose Schema definition
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type:String},
    email: {type:String},
    company:{type:String},
    enquiryType:{type:String},
    query:{type:String}
});

// Compile a 'User' model using the UserSchema as the structure.
// Mongoose also creates a MongoDB collection called 'User' for these documents.

var User = mongoose.model('User', UserSchema);


app.use(express.static('app'));

app.post('/submitForm',function(req,res){
  console.log("Submitting the details");
  var userModel=new User();
  userModel.name=req.body.Name;
  userModel.email=req.body.email;
  userModel.company=req.body.companyName;
  userModel.enquiryType=req.body.inquiryType;
  userModel.query=req.body.query;
  console.log(req.body);
  userModel.save(function(err,user){
    if(err){
      console.log("Not able to insert data:MongoDbError"+err);
    }
    else{
     // callMail();
      res.json({
        data:user
      });

    }
  })

})

*/




	
/*
else {
                console.log("entered to else::::::::::::::-1");
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                console.log("entered to else::::::::::-2");
                userModel.save(function(err, user) {
                    console.log("this is token before user");
                    console.log(user);
                    console.log("this is secret"+ process.env.JWT_SECRET);
                    console.log(process.env.JWT_SECRET);
                    user.token =jwt.sign(user, "aFFdeGkHRA");
                    user.save(function(err, user1) {
                        console.log("this is token after user");
                        console.log(user1)
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
*/