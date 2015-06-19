angular.module('articleApp.Controllers',[]).controller('loadIndexController',function($scope,$state,$http)
{
	//Routing to Home Page(Currently)
	$state.go('/home');

}).controller('validateCtrl', function($scope,$http) {

     $scope.contactUsUser = {
        userName: '',
        word: /^[a-zA-Z ]+$/
    };
    $scope.contactUsemail = {
		emailName:'',
		pattern:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
	};
	$scope.companyName='';
	$scope.initFlag=false;
	/*function for change in textbox*/
	$scope.change=function(userName){
		if($scope.contactUsUser.userName)
			var len=$scope.contactUsUser.userName.length;
		if(len==0){
				$scope.initFlag=true;
				}
			else{
				$scope.initFlag=true;
			}
		}
	/* click function of clear button*/
	$scope.clear=function(){
		$scope.initFlag=false;
	}
	// function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        $scope.formData={
        	Name:$scope.contactUsUser.userName,
        	email:$scope.contactUsemail.emailName,
        	companyName:$scope.companyName,
        	inquiryType:$scope.InquiryType,
        	query:$scope.userComment
        };
        if ($scope.myForm.$valid) {
            alert("You can execute this now");
            $http.post('/submitForm',$scope.formData).success(function(response){
            	console.log("this is success");
            	console.log("this is response"+response.data);
            	alert("Query Recieved Succesfully");
            })
        }
	}
	//ContactUs Add button functionality
	$scope.showFormFlag=false;
	$scope.showEditFlag=true;
	$scope.toggleForm=function(){
		$scope.showFormFlag=!$scope.showFormFlag;
		$scope.showEditFlag=!$scope.showEditFlag;
	}
	
}).controller('articleContentController',function($state,$scope,$location,$anchorScroll,$http,$rootScope,$localStorage,retrieveArticlesService,getArticleService,bookMarkService)
{
	/*
	console.log("Reading article data from external server");
	$http.get('http://www.github.com').success(function(response) {
		console.log("This is response data"+response.data);
	})
	*/
	console.log($rootScope.articleContent);
	$scope.article=$rootScope.articleContent;
	$scope.articleId=$rootScope.articleContent["ID"];
	$scope.articleCaption="";
	$scope.Industries="";
	$scope.custom_AppImageBig="";
	//$scope.isArticleBookMarked=false;
	$scope.userComments=[];
	
	/*
	//Retrieving data using promise

	var promise=retrieveArticlesService.articleDataPromise();
	promise.then(function(result){
		$scope.articlesData=result.data;

	}).then(function() {
		$scope.getarticleData();
	});
	
	//Getting Article Data
	$scope.getarticleData=function(){
		console.log("Getting article Data");
		$scope.articleData=getArticleService.getArticle($scope.articlesData,$scope.articleId);
		$scope.loadarticleData();
	}
	*/
	

	/***Loading Article Data***/
	$scope.loadarticleData=function(){
		$scope.articleCaption=$scope.article['ArticleCaption'];
		$scope.Industries=$scope.article['Industries'];
		$scope.custom_AppImageBig=$scope.article['custom_AppImageBig'];
	}
	$scope.loadarticleData();
	/***Clearing Local Storage(Can be used for only debugging purpose to clear storage)***/
	$scope.clearLocalStorage=function(){
		$localStorage.$reset();
	}


	/***Checking and Retrieving the bookMarked articles***/
	/*
	$scope.isArticleBookMarked=function(article)
	{
		//console.log("Executing aritcle bookmarking thing"+article['ID']);
		for(var i=0;i<$localStorage['bookmarks'].length;i++){
			//console.log("for this article"+$localStorage['bookmarks'][i]);
			if(article['ID']===$localStorage['bookmarks'][i]){
				//console.log(true);
				//console.log(article['ID'])
				return true;
			}
		}
	}
	
	$scope.bookMark=function(article){
		$scope.articleId=article["ID"];
		//$scope.checkBookMarkedArticles(articles['Articles'][i]);
		if($scope.isArticleBookMarked(article))
		{
			if($localStorage['bookmarks'].indexOf($scope.articleId)!=-1){
				$localStorage['bookmarks'].splice($localStorage['bookmarks'].indexOf($scope.articleId),1);
				//$scope.isArticleBookMarked=false;
				alert("Bookmark Removed");
			}
			
		}
		else
		{
			$localStorage['bookmarks'].push($scope.articleId);
			//$scope.isArticleBookMarked=true;
			alert("BookMark Created");
		}
		//$scope.checkBookMarkedArticles();
	}
	/*
	$scope.checkBookMarkedArticles=function(){
		if(!$localStorage['bookmarks']){
			//alert("Entering Here");
			$localStorage['bookmarks']=[];
			$rootScope.bookMarkedArticles=[];//Book Mark Object created for first time
		}
		else
		{
			if($localStorage['bookmarks'].length===0){
				$scope.isArticleBookMarked=false;
			}
			$scope.isArticleBookMarked=bookMarkService.checkBookMark($scope.articleId);
			if(!$scope.isArticleBookMarked){
				$scope.isArticleBookMarked=false;
				//alert("Article is not bookmarked");
			}
			$rootScope.bookMarkedArticles=$localStorage['bookmarks'];
			console.log("Local Storage is "+ $localStorage['bookmarks']);
			console.log("root scope is "+ $rootScope.bookMarkedArticles);
		}
	}
	$scope.checkBookMarkedArticles();
	$scope.bookMark=function(){
		if($scope.isArticleBookMarked)
		{
			if($localStorage['bookmarks'].indexOf($scope.articleId)!=-1){
				$localStorage['bookmarks'].splice($localStorage['bookmarks'].indexOf($scope.articleId),1);
				$scope.isArticleBookMarked=false;
				alert("Bookmark Removed");
			}
			
		}
		else
		{
			$localStorage['bookmarks'].push($scope.articleId);
			$scope.isArticleBookMarked=true;
			alert("BookMark Created");
		}
		$scope.checkBookMarkedArticles();
	}
	*/
	$scope.goBack=function(){
		console.log($rootScope.prevPage);
		$state.go($rootScope.prevPage.name);
	}

	
	$scope.postComment=function(){
		if($scope.user.comment){
			$scope.userComments.push($scope.user.comment)
			$scope.user.comment="";
		}

	}
	$scope.scrollTo=function(id){
		var old = $location.hash();
    	$location.hash(id);
    	$anchorScroll();//If parameter is ommited ,it takes the current value of $location.hash
    	$location.hash(old);
	}
	
}).controller('videoPageController',function($scope,$http,$sce,$location,$anchorScroll,retrieveVideosService,getDateService,promiseObj){
	console.log("This is promise Obj");
	//console.log(promiseObj.data);
	//console.log(promiseObj.data.data);
	$scope.videosdata=promiseObj.data.data;
	$scope.videoObj=$scope.videosdata[0];
	//console.log("this is ");
	//console.log($scope.videoObj);
	/*
	var promise=retrieveVideosService.videoDataPromise();
	promise.then(function(result){
		$scope.videosdata=result.data.data;
		$scope.videoObj=$scope.videosdata[0];
		console.log($scope.videosdata);
	});
*/

	$scope.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/MLvO2MfwwWU");
	$scope.getImageSource=function(imgsrc){
		$scope.videoObj=imgsrc;
		$scope.videoObj.baseUrl = 'https://www.youtube.com/embed/';
		$scope.videoUrl = $sce.trustAsResourceUrl($scope.videoObj.baseUrl + $scope.videoObj.video_id );
		//console.log($scope.videoObj.video_id, $scope.videoObj.baseUrl);
	}
	$scope.predicate='id';
	$scope.showinfo="true";
	$scope.infoclicked='1';
	$scope.clicked='1';
	$scope.toggleInfo=function(){
		$scope.showinfo = !$scope.showinfo;
		$scope.infoclicked= !$scope.infoclicked;
	}
	$scope.scrollTo=function(id){
		var old = $location.hash();
    	$location.hash(id);
    	$anchorScroll();//If parameter is ommited ,it takes the current value of $location.hash
    	$location.hash(old);
    }
    $scope.getDate1=function(createddate){
    	$scope.cdate=createddate.created_date;
    	$scope.daysAgo=getDateService.diffDate($scope.cdate);
    	
    	return($scope.daysAgo);
    }
}).controller('personCtrl', function($scope,retrieveArticlesService,$rootScope,$state,$localStorage,bookMarkService) {
	 //console.log("promiseObj");
	 //console.log(promiseObj);
	//console.log($rootScope.pro.data);
    $scope.myVar = true;
   // $scope.isArticleBookMarked=false;
    $scope.toggle = function() 
	{
      		$scope.myVar = !$scope.myVar;
    };

    //Retrieving data using promise

	var promise=retrieveArticlesService.articleDataPromise();
	promise.then(function(result){
		$scope.articlesData=result.data;
	}).then(function() {
		$scope.loadArticleLanding();
	});
	
	$scope.loadArticleLanding=function(){
		$scope.assets = $scope.articlesData;
		//$scope.loadBookMarkers($scope.assets);
	}
	$scope.showArticleContent=function(article){
		$rootScope.articleContent=article;
		$state.go('/articleDetails');
	}
	/*
	$scope.checkBookMarkedArticles=function(article){
		$scope.articleId=article['ID'];
		if(!$localStorage['bookmarks']){
			//alert("Entering Here");
			$localStorage['bookmarks']=[];
			$rootScope.bookMarkedArticles=[];//Book Mark Object created for first time
		}
		else
		{
			if($localStorage['bookmarks'].length===0){
				$scope.isArticleBookMarked=false;
			}
			$scope.isArticleBookMarked=bookMarkService.checkBookMark($scope.articleId);
			if(!$scope.isArticleBookMarked){
				$scope.isArticleBookMarked=false;
				//alert("Article is not bookmarked");
			}
			$rootScope.bookMarkedArticles=$localStorage['bookmarks'];
			console.log("Local Storage is "+ $localStorage['bookmarks']);
			console.log("root scope is "+ $rootScope.bookMarkedArticles);
		}
	}
	$scope.loadBookMarkers=function(articles){
		console.log(articles['Articles']);
		console.log(articles['Articles'].length);
		for(var i=0;i<articles['Articles'].length;i++){
			$scope.checkBookMarkedArticles(articles['Articles'][i]);
		}
	}
	*/
	/*
	$scope.isArticleBookMarked=function(article)
	{
		//console.log("Executing aritcle bookmarking thing"+article['ID']);
		for(var i=0;i<$localStorage['bookmarks'].length;i++){
			//console.log("for this article"+$localStorage['bookmarks'][i]);
			if(article['ID']===$localStorage['bookmarks'][i]){
				//console.log(true);
				//console.log(article['ID'])
				return true;
			}
		}
	}
	
	$scope.bookMark=function(article){
		$scope.articleId=article["ID"];
		//$scope.checkBookMarkedArticles(articles['Articles'][i]);
		if($scope.isArticleBookMarked(article))
		{
			if($localStorage['bookmarks'].indexOf($scope.articleId)!=-1){
				$localStorage['bookmarks'].splice($localStorage['bookmarks'].indexOf($scope.articleId),1);
				//$scope.isArticleBookMarked=false;
				alert("Bookmark Removed");
			}
			
		}
		else
		{
			$localStorage['bookmarks'].push($scope.articleId);
			//$scope.isArticleBookMarked=true;
			alert("BookMark Created");
		}
		//$scope.checkBookMarkedArticles();
	}
	*/


			
}).controller('homeController',function($scope,retrieveArticlesService,$rootScope,$state){
	var promise=retrieveArticlesService.articleDataPromise();
	promise.then(function(result){
		$scope.articlesData=result.data;
	}).then(function() {
		$scope.articles=$scope.articlesData['Articles'];
		console.log("This is directive");
		console.log("images length is"+$scope.articles.length);


	});

	$scope.loadArticleContent=function(article){
		//alert("clicked");
		$rootScope.articleContent=article;
		$state.go('/articleDetails');
	}
	
	$scope.number={};
	$scope.number["limit"]=3;
	$scope.active=0;
		$scope.lol=function(){
			if($scope.number["limit"]===3){
			$scope.number["limit"]=15;
			$scope.active=1;
			}
			else{
				$scope.number["limit"]=3;
				$scope.active=0;
			}
		}

}).controller('navigationController',function($scope,$state,userFactory){
	$scope.showModel=function(){
		userFactory.showModelsPage().then(function(data){
				if(data.data.type===false){
					$state.go('/signup');
				}
				else{
					$state.go('/models');
				}
			});
	}
	$scope.isActive = function (viewLocation) {
		//console.log($state);
	    if(viewLocation === $state.$current.name){
	    	 return true;
	    }
	    else{
	    	return false;
	    }
	   
	};
}).controller("loginValidControl",function($scope,userFactory){

	$scope.loginUser = {
      	userLogName: '',
        logPattern: /^[a-zA-Z ]+$/,
		emailLogName:'',
		emailPattern:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
		password:'',
		passwordCompare: '',
		dobValue: '',
		securityAnswer: ''
    };
	/*name*/
	$scope.loginFlag=true;
	/*email*/
	$scope.emailFlag=true;
	/*user name*/
	$scope.userFlag=true;
	/*password*/
	$scope.passwordFlag=true;
	/*confirm password*/
	$scope.passwordConfirmFlag=true;
	/*date of birth*/
	$scope.dobFlag=true;
	/*security answer*/
	$scope.securityFlag=true;
	/*User signIn flag*/
	$scope.userError=false;
	/*signup flag*/
	$scope.signUpFlag=true;
	$scope.loginFormFlag=false;
	$scope.forgotForm1Flag=false;
	$scope.forgotForm2Flag=false;

	/*invalid username or password in login form*/
	$scope.invalidFlag=true;
	
	$scope.logIn=function(formValid){
		//$scope.invalidFlag=false;
		alert("Logging in the user");
		$scope.userData={
			userName:$scope.loginUser.userName,
			password:$scope.loginUser.password
		}
		if(formValid){
			userFactory.logIn($scope.userData).then(function(data){

			});
		}
	}

	$scope.signUp=function(formValid){
		alert("Signing Up the user");
		$scope.userData={
			name:$scope.loginUser.userLogName,
			userName:$scope.loginUser.userName,
			email:$scope.loginUser.emailLogName,
			password:$scope.loginUser.password,
			dob:$scope.loginUser.dobValue,
			country:$scope.loginUser.country,
			securityAnswer:$scope.loginUser.securityAnswer
		}
		//console.log(formValid);
		if(formValid){
			userFactory.signUp($scope.userData).then(function(data){
				$scope.data=data.data;
				//console.log($scope.data);
			}).then(function(){
				$scope.validateUser($scope.data);
			});
			//Validating User Registration from the response
			$scope.validateUser=function(user){
				if(user.type===false){
					$scope.userError=true;
					$scope.userMessage=user.message;
				}
				else{
					$scope.userError=false;
					$scope.userMessage="";
					$scope.logInLink();
				}
			}
		}
	}
	$scope.signUpLink=function(){
		$scope.signUpFlag=true;
		$scope.loginFormFlag=false;
		$scope.forgotForm1Flag=false;
		$scope.forgotForm2Flag=false;
	}
	$scope.logInLink=function(){
		$scope.signUpFlag=false;
		$scope.loginFormFlag=true;
		$scope.forgotForm1Flag=false;
		$scope.forgotForm2Flag=false;
	}
	
});;