/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.ConfigHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Config", function (content) {
			app.ConfigHtmlContainer.name = "Config";
			app.ConfigHtmlContainer.html = content;
		});

		this.get("#/Config", function (context) {
			var context = context;
			if(context.app.ConfigHtmlContainer.name != ""){
				context.app.swap(context.app.ConfigHtmlContainer.html, new ConfigViewModel(), function () { });
			}else{
				context.app.fetch("/Config", function (content) {
					context.app.ConfigHtmlContainer.name = "Config";
					context.app.ConfigHtmlContainer.html = content;
					context.app.swap(context.app.ConfigHtmlContainer.html, new ConfigViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));