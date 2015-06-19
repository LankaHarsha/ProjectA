var articleApp=angular.module('articleApp', ['articleApp.Controllers','articleApp.directives','articleApp.services','articleApp.filters','articleApp.Factories','ui.router','ngSanitize','ngStorage']);
articleApp.config(function($stateProvider,$urlRouterProvider,$httpProvider){
	$stateProvider.state('/home',{
		url:'/home',
		templateUrl:'partials/home.html',
		title:'Home',
	}).state('/articleLanding',{
		url:'/articleLanding',
		templateUrl:'partials/articleLanding.html',
		title:'Article Landing'
	}).state('/articleDetails',{
		url:'/articleDetails',
		templateUrl:'partials/articleDetails.html',
		title:'Article Details'
	}).state('/videos',{
		url:'/videos',
		templateUrl:'partials/videos.html',
		title:'Videos',
		controller:'videoPageController',
		resolve:{
			promiseObj:function($http){
				return $http.get('data/videos.json').then(function(data) {
					//$rootScope.pro=data;
					return data;
				});
			}
		},
	}).state('/contactUs',{
		url:'/contactUs',
		templateUrl:'partials/contactUs.html',
		title:'Contact Us'
	}).state('/signup',{
		url:'/signup',
		templateUrl:'partials/signup.html',
		title:'Sign Up',
		resolve:{
			loggedin:checkLoggedout
		}
	}).state('/model',{
		url:'/model',
		templateUrl:'partials/model.html',
		title:'model',
		resolve:{
			loggedin:checkLoggedin
		}
	})


	$httpProvider.interceptors.push(function($q, $location){

	 	return { 
	 		response: function(response) { 
	 			//Do something on response
	 			return response;
	 		},
	 		responseError:function(reponse){
	 			if(response.type===false){
	 				$state.go('/')
	 			}
	 		}
		};
	});
});
articleApp.run(['$rootScope',
    function( $rootScope) {
    	alert("This is executing");
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (toState.title) {
            	console.log(toState.title);
                $rootScope.pageTitle = toState.title;
                $rootScope.prevPage=fromState;
            }
        });
    }
 ]);

var checkLoggedin = function($q,$timeout,$http,$location,$rootScope)
{
    var deffered =$q.defer();
    
    $http.get('/loggedin').success(function(user)
                                   {
        console.log('checkLoggedin');
        console.log(user);
           
        
        $rootScope.errorMessage=null;
        //User is Authenticated
    
        if(user!=='0')
        {
            $rootScope.currentUser =user;
            deffered.resolve();
        }
        //User is Not Authenticated
        else
        {
            $rootScope.errorMessage='You need to log in.';
            deffered.reject();
            $location.url('/login');
        }
    });
    console.log("deffered.promise");
     console.log(deffered.promise);
    
    return deffered.promise;
}
////  LOGIN CHECK////
var checkLoggedout =function($q,$timeout,$http,$location,$rootScope)
{
    var deffered =$q.defer();
      $http.get('/loggedin').success(function(user)
                                   {
        console.log('checkLoggedin');
        console.log(user);
           
        
        $rootScope.errorMessage=null;
        //User is Authenticated
    
        if(user!=='0')
        {
//            $rootScope.currentUser =user;
//            deffered.resolve();
             console.log("user is there in checkLoggedout");
             deffered.reject();
            $location.url('/');
            
        
        }
        //User is Not Authenticated
        else
        {
             console.log("user is  note there in checkLoggedout");
              deffered.resolve();
        
        }
    });
    return deffered.promise;
    
}