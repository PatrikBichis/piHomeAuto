/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.ListUnitsHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Units", function (content) {
			app.ListUnitsHtmlContainer.name = "ListUnits";
			app.ListUnitsHtmlContainer.html = content;
		});

		this.get("#/Units", function (context) {
			var context = context;
			if(context.app.ListUnitsHtmlContainer.name != ""){
				context.app.swap(context.app.ListUnitsHtmlContainer.html, new UnitsListViewModel(), function () { });
			}else{
				context.app.fetch("/Units", function (content) {
					context.app.ListUnitsHtmlContainer.name = "ListUnits";
					context.app.ListUnitsHtmlContainer.html = content;
					context.app.swap(context.app.ListUnitsHtmlContainer.html, new UnitsListViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));