angular.module('articleApp.directives',[]).directive('artFooter',function(){
	return{
		restrict:'AEC',
		templateUrl:'partials/footerTemplate.html',
		replace:true
	}
}).directive('artHeader',function(){
	return{
		restrict:'AEC',
		templateUrl:'partials/headerTemplate.html',
		replace:true
	}
}).directive('zoomPlus',function(){
	return{
		restrict:'A',
		link:function(scope,element,attrs){
			element.on('click',function(){
				var currentElement=$('.heroImage>img');
				var parentElement=$('.heroImage')
				var width = currentElement.width();
				var parentWidth = parentElement.width();
				var percent = 100*width/parentWidth;
				if(percent===100)
				{
					element.css('opacity','0.7').attr('ng-disable',true);
				}
				else
				{
					var perc=Math.ceil(percent*1.2);
					currentElement.css('width',perc+"%");
					$('.aMinus').css('opacity','1').attr('ng-disable',false);
				}
			})
		}
	}
}).directive('zoomMinus',function(){
	return{
		restrict:'A',
		link:function(scope,element,attrs)
		{
			element.on('click',function(){
				var currentElement=$('.heroImage>img');
				var parentElement=$('.heroImage')
				var width = currentElement.width();
				var parentWidth = parentElement.width();
				var percent = 100*width/parentWidth;
				console.log(Math.floor(percent));
				if(Math.floor(percent)<=57)
				{
					element.css('opacity','0.7').attr('ng-disable',true);
				}
				else
				{
					var perc=Math.floor(percent/1.2);
					currentElement.css('width',perc+"%");
					$('.aPlus').css('opacity','1').attr('ng-disable',false);
				}
			})
		}
	}
}).directive('printPage',function(){
	return{
		restrict:'A',
		link:function(scope,elem,attrs){
			//var printSection = document.getElementById('wrapper');
			var printSection = document.getElementById('printSection');
        	// if there is no printing section, create one
        	if (!printSection) {
	            printSection = document.createElement('div');
	            printSection.id = 'printSection';
	            document.body.appendChild(printSection);
       		}
			
			elem.on('click', function () {
				console.log(true);
            	var elemToPrint = document.getElementById('articleContentWrapper');
                if (elemToPrint) {
                    printElement(elemToPrint);
                    $('articleContentWrapper').css('marginTop','0');
                    window.print();
                    onAfterPrint();
                }
            });
            var onAfterPrint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
                 $('articleContentWrapper').css('marginTop','60');
            };
            var printElement=function(elem){
            	  // clones the element you want to print
            	var domClone = elem.cloneNode(true);
            	printSection.appendChild(domClone);
            };
		}

	}
}).directive('slider', function ($timeout,retrieveArticlesService,$rootScope,$state) {
			  return {
			    restrict: 'AE',
				replace: true,
				scope:{
					
				},
			    link: function (scope, elem, attrs) {

			    	scope.loadArticleContent=function(article){
							//alert("clicked");
							$rootScope.articleContent=article;
							$state.go('/articleDetails');
					}
			    	var promise=retrieveArticlesService.articleDataPromise();
					promise.then(function(result){
						scope.articlesData=result.data;
					}).then(function() {
						scope.images=scope.articlesData['Articles'];
						console.log("This is directive");
						console.log("images length is"+scope.images.length);
						scope.currentIndex=0;
						$(".view1_row").css("background-image","url("+scope.images[scope.currentIndex]['custom_AppImageBig']+")");

					scope.next=function(){
						if(scope.currentIndex<4){
							scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
							$(".view1_row").css("background-image","url("+scope.images[scope.currentIndex]['custom_AppImageBig']+")");
						}
						else{
							scope.currentIndex=0;
							$(".view1_row").css("background-image","url("+scope.images[scope.currentIndex]['custom_AppImageBig']+")");
						}
					};
					
					scope.prev=function(){
						if(scope.currentIndex===0){
							scope.currentIndex=4;
							$(".view1_row").css("background-image","url("+scope.images[scope.currentIndex]['custom_AppImageBig']+")");
						}
						else{
							scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
							$(".view1_row").css({"background-image":"url("+scope.images[scope.currentIndex]['custom_AppImageBig']+")"});
							}
					};
					
					
					scope.$watch('currentIndex',function(){
						scope.images.forEach(function(image){
							image.visible=false;
						});
						scope.images[scope.currentIndex].visible=true;
					});
					
					/* Start: For Automatic slideshow*/
					
					var timer;
					
					var sliderFunc=function(){
						timer=$timeout(function(){
							if(scope.currentIndex<4){
							scope.next();
							}
							else{
								scope.currentIndex=0;
							}
							timer=$timeout(sliderFunc,500);
						},5000);
					};
					
					sliderFunc();
					
					});
					
					/* End : For Automatic slideshow*/
					
			    },
				templateUrl:'partials/slide.html'
			  }
}).directive('bookMarker',function($localStorage){

	return{
		restrict:'AE',
		
		link:function(scope,elem,attr){
			//console.log(scope.article);
			if(!$localStorage['bookmarks']){
				console.log("bookmarks array is creating");
				$localStorage['bookmarks']=[];
			}
			console.log("this is articles id"+scope.article['ID']);
			var isArticleBookMarked=function(){
				console.log("is Article Bookmarked function is executing");
				for(var i=0;i<$localStorage['bookmarks'].length;i++){
					if(scope.article['ID']===$localStorage['bookmarks'][i]){
						return true;
					}
				}
				return false;
			}
			console.log("I am calling is article book marked");
			if(isArticleBookMarked())
			{
				elem.addClass('changeYellow');
				console.log("I changed color to yellow");
			}
			else
			{
				//$('.readLaterJQ').css('color','black');
				elem.addClass('changeBlack');
				console.log("I changed color to black");
			}
			// elem.click(function(){
			// 	bookMark();
			// });
			elem.bind('click',function(){
				bookMark();
			})
			var bookMark=function(){
				//$scope.articleId=article["ID"];
				console.log(isArticleBookMarked());
				if(isArticleBookMarked())
				{
					if($localStorage['bookmarks'].indexOf(scope.article['ID'])!=-1){
						$localStorage['bookmarks'].splice($localStorage['bookmarks'].indexOf(scope.article['ID']),1);
						//$('.readLaterJQ').css('color','black');
						elem.addClass('changeBlack');
						elem.removeClass('changeYellow');
						alert("Bookmark Removed");
					}
					
				}
				else
				{
					$localStorage['bookmarks'].push(scope.article['ID']);
					//$('.readLaterJQ').css('color','#FF9933');
					elem.addClass('changeYellow');
					elem.removeClass('changeBlack');
					alert("BookMark Created");
				}
			}
		}
		
		
	}


}).directive('bookMarkvideo',function($localStorage){

	return{
		restrict:'AE',
		require:'ngModel',
		link:function(scope,elem,attr,ngModelController){
			//console.log(scope.article);
			//console.log("This is ngModelController new one");
			//console.log(ngModelController);
			//console.log(ngModelController.$render());
			ngModelController.$formatters.push(function(value){
				if(isArticleBookMarked())
				{
					elem.addClass('changeYellow');
					elem.removeClass('changeWhite');
				}
				else
				{	
					elem.addClass('changeWhite');
					elem.removeClass('changeYellow');
				}
			});
			console.log("Directive is executing");
			if(!$localStorage['bookmarkvideos']){
				//console.log("bookmarks array is creating");
				$localStorage['bookmarkvideos']=[];
			}
			//console.log("this is articles id"+scope.article['ID']);
			var isArticleBookMarked=function(){
				//console.log("is Article Bookmarked function is executing");
				for(var i=0;i<$localStorage['bookmarkvideos'].length;i++){
					if(scope.videoObj['video_id']===$localStorage['bookmarkvideos'][i]){
						return true;
					}
				}
				return false;
			}
			//console.log("I am calling is article book marked");
			if(isArticleBookMarked())
			{
				elem.addClass('changeYellow');
				//console.log("I changed color to yellow");
			}
			else
			{
				//$('.readLaterJQ').css('color','black');
				elem.addClass('changeWhite');
				//console.log("I changed color to black");
			}
			// elem.click(function(){
			// 	bookMark();
			// });
			elem.bind('click',function(){
				bookMark();
				//alert("You clicked  me");
				//console.log(scope.videoObj['video_id']);
			})
			var bookMark=function(){
				//$scope.articleId=article["ID"];
				console.log(isArticleBookMarked());
				if(isArticleBookMarked())
				{
					if($localStorage['bookmarkvideos'].indexOf(scope.videoObj['video_id'])!=-1){
						$localStorage['bookmarkvideos'].splice($localStorage['bookmarkvideos'].indexOf(scope.videoObj['video_id']),1);
						//$('.readLaterJQ').css('color','black');
						elem.addClass('changeWhite');
						elem.removeClass('changeYellow');
						alert("Bookmark Removed");
					}
					
				}
				else
				{
					$localStorage['bookmarkvideos'].push(scope.videoObj['video_id']);
					//$('.readLaterJQ').css('color','#FF9933');
					elem.addClass('changeYellow');
					elem.removeClass('changeWhite');
					alert("BookMark Created");
				}
			}
		}
		
		
	}


}).directive('ngMatch', ['$parse', function ($parse) {

	var directive = {
	link: link,
	restrict: 'A',
	require: '?ngModel'
	};
	return directive;
 
	function link(scope, elem, attrs, ctrl) {
	// if ngModel is not defined, we don't need to do anything
		if (!ctrl) return;
		if (!attrs['ngMatch']) return;
		 
		var firstPassword = $parse(attrs['ngMatch']);
		 
		var validator = function (value) {
		var temp = firstPassword(scope),
		v = value === temp;
		ctrl.$setValidity('match', v);
		return value;
		}
		 
		ctrl.$parsers.unshift(validator);
		ctrl.$formatters.push(validator);
		attrs.$observe('ngMatch', function () {
		validator(ctrl.$viewValue);
		});
	}
}]);