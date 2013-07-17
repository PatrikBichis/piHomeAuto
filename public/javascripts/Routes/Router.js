(function ($) {
    var app = $.sammy('#body', function () {

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

        // 
        // Default route
        this.get('#/', function (context) {
            var context = context;
            context.app.fetch("/Home", function (content) {
                context.app.swap(content, null, function () { });
            });
        });

        this.get('#/units', function (context) {
            var context = context;
            context.app.fetch("/units", function (content) {
                context.app.swap(content, new UnitsViewModel(), function () { });
            });
        });

        this.get('#/sonos', function (context) {
            var context = context;
            context.app.fetch("/sonos", function (content) {
                context.app.swap(content, new SonosViewModel(), function () { });
            });
        });

        this.get('#/net', function (context) {
            var context = context;
            context.app.fetch("/net", function (content) {
                context.app.swap(content, new NetViewModel(), function () { });
            });
        });

        this.get('#/groups', function (context) {
            var context = context;
            context.app.fetch("/groups", function (content) {
                context.app.swap(content, new GroupsViewModel(), function () { });
            });
        });

    });

    /***
    * On document ready, start route application.
    */
    $(function () {
        app.run('#/');
    });

})(jQuery);