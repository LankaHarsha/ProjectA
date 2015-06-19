var database=require('../config/database-schema.js'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy

//***********************Submitting Enquiry details in "Contact Us Page"

exports.submitEnquiry=function(req,res){
	console.log("Submitting the Enquiry Details");
	//*********Constructing Document with Model Created in database-schema.js(contactUser)
	var userModel=new database.contactUser();
	userModel.name=req.body.Name;
  	userModel.email=req.body.email;
  	userModel.company=req.body.companyName;
  	userModel.enquiryType=req.body.inquiryType;
  	userModel.query=req.body.query;
  	console.log(req.body);
  	//Inserting into
  	userModel.save(function(err,contactUser){
  		if(err){
  			console.log("Not able to insert data in MongoDb::"+err);
  			res.json({
  				type:false,
  				status:'Error',
  				data:null
  			});
  		}
  		else{
  			console.log("Query Inserted Successfully");
  			res.json({
  				type:true,
  				status:'Success',
  				data:contactUser
  			});
  		}
  	});
};

//*********************Signing Up the User***************
exports.signUpUser=function(req,res){
	console.log("Signing/Registering the User");
	console.log("This is what we got request:::");
	console.log(req.body);
	
	//Query for checking whether this userAlready Exists

	database
	.user
	.findOne()
	.or([{userName:req.body.userName},{email:req.body.email}])
	.select('userName email')
	.exec(function(err,user){
		if(err){
			console.log("This is error");
		}
		else{
			console.log("This is success");
			if(user){
				if(user.userName===req.body.userName){
					console.log("UserName already Exists");
					res.json({
						type:false,
						status:'Error',
						data:null,
						message:"UserName already exists"
					})
				}
				else{
					console.log("Email already Exists");
					res.json({
						type:false,
						status:'Error',
						data:null,
						message:"Email already exists"
					})
				}
			}
			else{
				var result=registerUser(req);
				console.log("This is result");
				console.log(result);
				res.json(result);
			}
		}
	})



	var registerUser=function(req){
		var userModel=new database.user();
		userModel.Name=req.body.name;
		userModel.userName=req.body.userName;    
		userModel.password=req.body.password;
		userModel.email=req.body.email;
		userModel.DOB=req.body.dob;
		userModel.country=req.body.country;
		userModel.securityAns=req.body.securityAnswer;
		userModel.isBlocked=false;
		//Inserting Document into table (Users)
		userModel.save(function(err,user){
			if(err){
				console.log("Error in insertion"+err);
				return {
					type:false,
					status:'Error',
					data:null,
					message:err
				};
			}
			else{
				console.log("User Inserted Successfully");
				return {
					type:true,
					status:'Success',
					data:user
				};
			}
		});
	}
	
	

	

}
/*
exports.logInUser=function(req,res){
	console.log("Logging In the User");
	console.log("This is what we got request:::");
	console.log(req.body);
	//Querying to authenticate
	database
	.user
	.findOne()
	.and([{userName:req.body.userName},{password:req.body.password}])
	.select('userName email').exec(function(err,user){
		if(err){
			console.log("This is database error");
		}
		else{
			console.log(user);
		}
	});
}
*/

//Middleware function to be used for every secured routes 
exports.auth=function(req,res,next){
	if(!req.isAuthenticated()){
		res.json({
			type:false,
			status:'Error',
			data:null,
			message:'Unauthorized User'
		});
	}
	else{
		next();
	}
};

exports.showModel=function(req,res){
	console.log("You are accesable to showModel");
	console.log(req.user);
	res.json({
		type:true,
		status:'Success',
		data:req.user
	});
};

exports.logInThroughPassport=function(req,res){
	console.log("Started authenticate from passport");
	passport.authenticate('local',{failureFlash:'Invalid User'});
}
exports.logInUser=function(req,res){
	console.log("This is method of logInuser");
	console.log(req.user);
	res.send(req.user);
}
exports.loggedIn=function(req,res){
	res.send(req.isAuthenticated() ? req.user : '0');
}
exports.logOut=function(req,res){
	req.logOut();
	res.send(200);
}

// passport session setup ==================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
//Functions Required for Passport Middleware

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  database.user.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy({
		usernameField: 'userName',
	    passwordField: 'password'
	},function(username, password, done) {

	console.log("Entered to passport function");

  	/*
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    */
	    database
		.user
		.findOne()
		.and([{userName:username},{password:password}])
		.select('userName email').exec(function(err,user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null,false,{message:'Incorect username/Password'});
			}
			return done(null,user);
		});
	}
));