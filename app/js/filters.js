angular.module("articleApp.filters",[]).filter('keepDots', function () {
    return function (text, length) {
        if (text.length > length) {
        	//alert('<a title="'+text+'">...</a>');
            return text.substr(0, length) +" "+ '<a title="'+text+'">...</a>'
        }
        return text;
    }
}).filter('categoryBased', function () {
	return function (data , cat1) {
		this.data=data;
		var obj = [];
		
		for(var i=0; i < data.length ; i++)
		{
			//console.log(data[i].theme_name);
			var catname=data[i].theme_name.split(',');
			//console.log(catname[0],catname[1]);
			for(j=0 ; j< catname.length ;j++)
			{
				if(cat1 == catname[j])
				{
					
					obj.push(data[i]);
					//console.log(data[i]);
				} 
			}
		}
		
		if(obj.length == 0 )
		{
			return data;
		}
		else
		{
			return obj;
		}
		
	}
}).filter('articleFiltering', function () {
	return function (data , month , year ,theme) {
		this.data=data;
		this.month=month;
		//console.log(month , year , theme);
		var catarticles = [];
		var flag=0;
		for(var i=0; i< data.length ; i++)
		{
			var date1= new Date(data[i].ArticleModifiedDate);
			//console.log(date1);
			var monthname=(date1 + '').split(' ');
			//console.log(m[1],m[3]);
			var themename = data[i].Themes.split(',');
			for(var j=0 ; j< themename.length ; j++)
			{
				if((month==monthname[1]) && (year==monthname[3]) && (theme==themename[j]))
				{
					catarticles.push(data[i]);
						
				}
				if((month!=monthname[1]) && (year!=monthname[3]) && (theme!=themename[j]))
				{
					flag = 1;
				}
			}

		}

		
		if((catarticles.length == 0) && ((month== undefined) || (month== undefined) || (theme== undefined)))
		{
			return data;
		}

		else if(catarticles.length != 0)
		{
			return catarticles;
		}
	}
});;
