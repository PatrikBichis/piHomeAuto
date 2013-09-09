/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.MobileListUnitsHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/MobileUnits", function (content) {
			app.MobileListUnitsHtmlContainer.name = "MobileListUnits";
			app.MobileListUnitsHtmlContainer.html = content;
		});

		this.get("#/MobileUnits", function (context) {
			var context = context;
			if(context.app.MobileListUnitsHtmlContainer.name != ""){
				context.app.swap(context.app.MobileListUnitsHtmlContainer.html, new MobileUnitsListViewModel(), function () { });
			}else{
				context.app.fetch("/MobileUnits", function (content) {
					context.app.MobileListUnitsHtmlContainer.name = "MobileListUnits";
					context.app.MobileListUnitsHtmlContainer.html = content;
					context.app.swap(context.app.MobileListUnitsHtmlContainer.html, new MobileUnitsListViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));