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
				context.app.swap(context.app.HomeHtmlContainer.html, null, function () { });
			}else{
				context.app.fetch("/Home", function (content) {
					context.app.HomeHtmlContainer.name = "Home";
					context.app.HomeHtmlContainer.html = content;
					context.app.swap(context.app.HomeHtmlContainer.html, null, function () { });
				});
			}
		});

	});
} (jQuery));