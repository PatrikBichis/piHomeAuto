/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.MapHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Map", function (content) {
			app.MapHtmlContainer.name = "Map";
			app.MapHtmlContainer.html = content;
		});

		this.get("#/Map", function (context) {
			var context = context;
			if(context.app.MapHtmlContainer.name != ""){
				context.app.swap(context.app.MapHtmlContainer.html, new MapViewModel(), function () { });
			}else{
				context.app.fetch("/Map", function (content) {
					context.app.MapHtmlContainer.name = "Map";
					context.app.MapHtmlContainer.html = content;
					context.app.swap(context.app.MapHtmlContainer.html, new MapViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));