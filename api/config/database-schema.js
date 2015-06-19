var mongoose=require('mongoose');
var mongoURL='mongodb://10.241.174.154:27017/CI_PERSPECTIVES';//(CI_PERSPECTIVES will be the database name in mongodb)
var Schema=mongoose.Schema;

//Connecting to mongodb

mongoose.connect(mongoURL,function(err,res){
	if(err){
		console.log("Connection Refused to MongoDB::"+mongoURL);
	}
	else{
		console.log("Connection Succesfull");
	}
})

//Schema Designed for Storing User Data in Contact Us page
var ContactUserSchema = new Schema({
    name: {type:String},
    email: {type:String},
    company:{type:String},
    enquiryType:{type:String},
    query:{type:String}
});

//Schema Defined for Storing User Information to SignUp user
var UserSchema=new Schema({
	Name:{type:String,required:true},
	userName:{type:String,required:true,unique:true},
	password:{type:String,required:true},
	email:{type:String,required:true,unique:true},
	DOB:{type:Date,required:true},
	country:{type:String},
	securityAns:{type:String,required:true},
	isBlocked:{type:Boolean,required:true}
});

//Compiling schema's to a model(Just like a class)
//Creating Models
var contactUser=mongoose.model('contactUser',ContactUserSchema);//(ContactUser will be the table/Collection name in database)
var user=mongoose.model('User',UserSchema);//(User will be the table/Collection name in database)

//Exporting Models

exports.contactUser=contactUser;
exports.user=user;
