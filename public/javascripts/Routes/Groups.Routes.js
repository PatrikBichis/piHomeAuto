/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

(function ($) {
	var app = $.sammy('#body', function () {

		this.ListGroupsHtmlContainer = new this.htmlContainerObject("","");

		this.fetch("/Groups", function (content) {
			app.ListGroupsHtmlContainer.name = "ListGroups";
			app.ListGroupsHtmlContainer.html = content;
		});

		this.get("#/Groups", function (context) {
			var context = context;
			if(context.app.ListGroupsHtmlContainer.name != ""){
				context.app.swap(context.app.ListGroupsHtmlContainer.html, new GroupsListViewModel(), function () { });
			}else{
				context.app.fetch("/Groups", function (content) {
					context.app.ListGroupsHtmlContainer.name = "ListGroups";
					context.app.ListGroupsHtmlContainer.html = content;
					context.app.swap(context.app.ListGroupsHtmlContainer.html, new GroupsListViewModel(), function () { });
				});
			}
		});

	});
} (jQuery));