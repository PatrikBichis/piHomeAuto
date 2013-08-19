/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.HomeHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Home", function (content) {
			app.HomeHtmlContainer.name = "Home";
			app.HomeHtmlContainer.html = content;
		});

		this.get("#/", function (context) {
			var context = context;
			if(context.app.HomeHtmlContainer.name != ""){
<<<<<<< HEAD
				context.app.swap(context.app.HomeHtmlContainer.html, new HomeViewModel(), function () { });
=======
				context.app.swap(context.app.HomeHtmlContainer.html, null, function () { });
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
			}else{
				context.app.fetch("/Home", function (content) {
					context.app.HomeHtmlContainer.name = "Home";
					context.app.HomeHtmlContainer.html = content;
<<<<<<< HEAD
					context.app.swap(context.app.HomeHtmlContainer.html, new HomeViewModel(), function () { });
=======
					context.app.swap(context.app.HomeHtmlContainer.html, null, function () { });
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
				});
			}
		});

	});
} (jQuery));