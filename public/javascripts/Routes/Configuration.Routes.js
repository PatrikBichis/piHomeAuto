/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.ConfigurationHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Configuration", function (content) {
			app.ConfigurationHtmlContainer.name = "Configuration";
			app.ConfigurationHtmlContainer.html = content;
		});

		this.get("#/Configuration", function (context) {
			var context = context;
			if(context.app.ConfigurationHtmlContainer.name != ""){
				context.app.swap(context.app.ConfigurationHtmlContainer.html, new ConfigurationViewModel(), function () { });
			}else{
				context.app.fetch("/Configuration", function (content) {
					context.app.ConfigurationHtmlContainer.name = "Configuration";
					context.app.ConfigurationHtmlContainer.html = content;
					context.app.swap(context.app.ConfigurationHtmlContainer.html, new ConfigurationViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));