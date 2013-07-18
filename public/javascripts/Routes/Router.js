(function ($) {
    var app = $.sammy('#body', function () {

        this.htmlContainerObject = function(name, html){
            this.name = name;
            this.html = html;
        };

        this.homeHtmlContainer = new this.htmlContainerObject("","");
        this.netHtmlContainer = new this.htmlContainerObject("","");
        this.unitsHtmlContainer = new this.htmlContainerObject("","");
        this.sonosHtmlContainer = new this.htmlContainerObject("","");
        this.groupsHtmlContainer = new this.htmlContainerObject("","");


        /***
        * Save current active viewmodel from knockout.
        * Used for enabeling dispose functionality for
        * viewmodels.
        */
        this.currentVm = {};
        this.cleanUp = function () {
            if (this.currentVm == null || this.currentVm == undefined)
                return;

            if (typeof this.currentVm.dispose === 'function') {
                this.currentVm.dispose();
            };
        };

        /***
        * Override default sammy swap method to include
        * fadeIn/faceOut animation. Used to swap content
        * in main container.
        * Will call dispose function on previous used viewmodel.
        * 
        * @param [object]   content, content to replace in the main container.
        * @param [object]   vm, ViewModel to bind to current view.
        * @param [function] callback, callback function when swap is complete.
        */
        this.swap = function (content, vm, callback) {
            this.cleanUp();
            var context = this;
            var vm = vm;
            var callback = callback;
            context.$element().fadeOut('fast', function () {
                context.$element().html(content);

                // apply new viewmodel to view
                ko.applyBindings(vm, document.getElementById("body"));

                // save current viewmodel
                context.currentVm = vm;

                // callback to caller
                context.$element().fadeIn('fast', function () {
                    if (callback) {
                        callback.apply();
                    }
                });
            });
        };

        /***
        * Addon to sammy js. Fetch html content from
        * url and return with content with callback.
        *
        * @param [object] url, url to fetch data from
        * @param [function] callback, call on ajax success
        */
        this.fetch = function (url, callback) {
            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                success: function (content) {
                    if (callback != null) {
                        callback(content);
                    }
                },
                error: function (err) {
                    // TODO redirect to sammy error route
                }
            });
        };

        // Preloading all html file when start file is loaded
        this.loadHtml = function (context, callback){
            var context = context;
            context.app.fetch("/Home", function (content) {
                context.app.homeHtmlContainer.name = "home";
                context.app.homeHtmlContainer.html = content;

                context.app.fetch("/net", function (content) {
                    context.app.netHtmlContainer.name = "net";
                    context.app.netHtmlContainer.html = content;

                    context.app.fetch("/units", function (content) {
                        context.app.unitsHtmlContainer.name = "units";
                        context.app.unitsHtmlContainer.html = content;

                        context.app.fetch("/sonos", function (content) {
                            context.app.sonosHtmlContainer.name = "sonos";
                            context.app.sonosHtmlContainer.html = content;

                            context.app.fetch("/groups", function (content) {
                                context.app.groupsHtmlContainer.name = "groups";
                                context.app.groupsHtmlContainer.html = content;

                                callback();
                            });
                        });
                    });
                });
            });
        }; 

        // 
        // Default route
        this.get('#/', function (context) {
            var context = context;
            if(context.app.homeHtmlContainer.name != ""){
                context.app.swap(context.app.homeHtmlContainer.html, null, function () { });
            }else{
                context.app.loadHtml(context, function(){
                    context.app.swap(context.app.homeHtmlContainer.html, null, function () { });
                });
            }
        });

        this.get('#/units', function (context) {
            var context = context;
            if(context.app.unitsHtmlContainer.name != ""){
                context.app.swap(context.app.unitsHtmlContainer.html, new UnitsViewModel(), function () { });
            }else{
                context.app.loadHtml(context, function(){
                    context.app.swap(context.app.unitsHtmlContainer.html, new UnitsViewModel(), function () { });
                });
            }
        });


        this.get('#/sonos', function (context) {
            var context = context;
            if(context.app.sonosHtmlContainer.name != ""){
                context.app.swap(context.app.sonosHtmlContainer.html, new SonosViewModel(), function () { });
            }else{
                context.app.loadHtml(context, function(){
                    context.app.swap(context.app.sonosHtmlContainer.html, new SonosViewModel(), function () { });
                });
            }
        });

        this.get('#/net', function (context) {
            var context = context;
            if(context.app.netHtmlContainer.name != ""){
                context.app.swap(context.app.netHtmlContainer.html, new NetViewModel(), function () { });
            }else{
                context.app.loadHtml(context, function(){
                    context.app.swap(context.app.netHtmlContainer.html, new NetViewModel(), function () { });
                });
            }
        });

        this.get('#/groups', function (context) {
            var context = context;
            if(context.app.groupsHtmlContainer.name != ""){
                context.app.swap(context.app.groupsHtmlContainer.html, new GroupsViewModel(), function () { });
            }else{
                context.app.loadHtml(context, function(){
                    context.app.swap(context.app.groupsHtmlContainer.html, new GroupsViewModel(), function () { });
                });
            }
        });

    });

    /***
    * On document ready, start route application.
    */
    $(function () {
        
        // Start web app
        app.run('#/');

    });

})(jQuery);