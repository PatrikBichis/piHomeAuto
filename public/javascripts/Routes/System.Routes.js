/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.SystemInfoHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/SystemInfo", function (content) {
			app.SystemInfoHtmlContainer.name = "SystemInfo";
			app.SystemInfoHtmlContainer.html = content;
		});

		this.get("#/SystemInfo", function (context) {
			var context = context;
			if(context.app.SystemInfoHtmlContainer.name != ""){
				context.app.swap(context.app.SystemInfoHtmlContainer.html, new SystemInfoViewModel(), function () { });
			}else{
				context.app.fetch("/SystemInfo", function (content) {
					context.app.SystemInfoHtmlContainer.name = "SystemInfo";
					context.app.SystemInfoHtmlContainer.html = content;
					context.app.swap(context.app.SystemInfoHtmlContainer.html, new SystemInfoViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));