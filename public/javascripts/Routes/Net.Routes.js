/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.ListNetworkUnitsHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Net", function (content) {
			app.ListNetworkUnitsHtmlContainer.name = "ListNetworkUnits";
			app.ListNetworkUnitsHtmlContainer.html = content;
		});

		this.get("#/Net", function (context) {
			var context = context;
			if(context.app.ListNetworkUnitsHtmlContainer.name != ""){
				context.app.swap(context.app.ListNetworkUnitsHtmlContainer.html, new NetListViewModel(), function () { });
			}else{
				context.app.fetch("/Net", function (content) {
					context.app.ListNetworkUnitsHtmlContainer.name = "ListNetworkUnits";
					context.app.ListNetworkUnitsHtmlContainer.html = content;
					context.app.swap(context.app.ListNetworkUnitsHtmlContainer.html, new NetListViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));