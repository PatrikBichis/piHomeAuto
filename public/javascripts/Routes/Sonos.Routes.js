/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.ListSonosSpeakersHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Sonos", function (content) {
			app.ListSonosSpeakersHtmlContainer.name = "ListSonosSpeakers";
			app.ListSonosSpeakersHtmlContainer.html = content;
		});

		this.get("#/Sonos", function (context) {
			var context = context;
			if(context.app.ListSonosSpeakersHtmlContainer.name != ""){
				context.app.swap(context.app.ListSonosSpeakersHtmlContainer.html, new SonosListViewModel(), function () { });
			}else{
				context.app.fetch("/Sonos", function (content) {
					context.app.ListSonosSpeakersHtmlContainer.name = "ListSonosSpeakers";
					context.app.ListSonosSpeakersHtmlContainer.html = content;
					context.app.swap(context.app.ListSonosSpeakersHtmlContainer.html, new SonosListViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));