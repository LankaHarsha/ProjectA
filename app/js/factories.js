angular.module('articleApp.Factories',[]).factory('userFactory',function($http){
	var factory={};
	factory.signUp=function(userData){
		alert("Sending signUp post request to server");
		return $http.post('/signUp',userData).success(function(response){
			alert("Got success from Server");
			return response;
		}).error(function(error){
			alert("Got error from Server");
			return error;
		})
	}
	factory.logIn=function(userData){
		alert("Sending logIn post request to server");
		return $http.post('/login',userData).success(function(response){
			alert("Got success from Server");
			return response;
		}).error(function(error){
			alert("Got error from Server");
			return error;
		})
	}
	factory.logOut=function(){
		alert("Sending logout post request to server");
		return $http.post('/logOut').success(function(response){
			alert("Got success from server");
			return response;
		}).error(function(error){
			alert("Got error from server");
			return error;
		})
	}
	factory.showModelsPage=function(){
		alert("Sending model get req to the server");
		return $http.get('/model').success(function(response){
			alert("Got success from server");
			return response;
		}).error(function(error){
			alert("Got error from server");
			return error;
		})
	}
	return factory;
})