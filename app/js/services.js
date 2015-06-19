angular.module('articleApp.services',[]).service("retrieveArticlesService",function($http,$q) {
	
	/*****Retrieving JSON Data Service***/
	var deffered=$q.defer();
	$http.get('data/perspectiveArticles.json').then(function(data) {
		deffered.resolve(data);
	});
	this.articleDataPromise=function(){
		return deffered.promise;	
	}

}).service('getArticleService',function() {

	this.getArticle=function(articles,id)
	{
		var article=null;
		for(var i=0;i<articles['Articles'].length;i++){

			if(articles['Articles'][i]['ID']===id)
			{
				article=articles['Articles'][i];
				break
			}
		}
		return article;
	}
	

}).service('bookMarkService',function($localStorage){

	this.checkBookMark=function(articleId){
		var isArticleBookMarked=false;
		for(var i=0;i<$localStorage['bookmarks'].length;i++){

			if(articleId===$localStorage['bookmarks'][i])
			{
				isArticleBookMarked=true;
				//alert("Article is bookmarked");
				break;
			}
		}
		return isArticleBookMarked;
	}
}).service("retrieveVideosService",function($http,$q) {
	
	/*****Retrieving JSON Data Service***/
	var deffered=$q.defer();
	$http.get('data/videos.json').then(function(data) {
		deffered.resolve(data);
	});
	this.videoDataPromise=function(){
		return deffered.promise;	
	}
}).service('getDateService',function(){

	this.diffDate=function(curdate){
			var tdate=new Date();
	    	var cdate=new Date(curdate);
	    	//console.log(($scope.cdate));
	    	//console.log(($scope.tdate)-($scope.cdate));
	    	//$scope.Math=Math;
	    	var daysago=Math.floor(((tdate)-(cdate))/(1000*60*60*24));
	    	var days=Math.floor(daysago/30);
	    	//console.log(days);
	    	if(days < 1)
	    	{
	    		return (daysago +' days');
	    	}
	    	else if(days == 1)
	    	{
	    		return (days +' month');
	    	}
	    	else if(days > 1 && days < 12)
	    	{
	    		return (days +' months');
	    	}
	    	else if((Math.floor((days)/12)) == 1)
	    	{
	    		return (Math.floor((days)/12) +' year');
	    	}
	    	else if((Math.floor((days)/12)) > 1)
	    	{
	    		return (Math.floor(days/12) +' years');
	    	}
		}
});