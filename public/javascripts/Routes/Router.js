(function ($) {
    var app = $.sammy('#body', function () {

        this.htmlContainerObject = function(name, html){
            this.name = name;
            this.html = html;
        };
        
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
                    }else{
                         console.log("content was null");
                    }
                },
                error: function (err) {
                    // TODO redirect to sammy error route
                    console.log(err);
                }
            });
        };

        /***
        * On document ready, start route application.
        */
        $(function () {

            var preloadImgs = function(callback, data){
                var current, image_urls = data, i, imgObj = new Image;

                for (i = 0; i < image_urls.length; i += 1) {
                    current = (imgObj.src = "/images/" + image_urls[i]);
                    if (current.complete) { // image is cached/loaded
                      // do something with the cached/loaded image
                    }
                }

                callback();
            };

            // Preloading alla images in the application
            $.get("/Addins/GetImages", function(data) {
                if(data !== undefined){
                    if(data.length > 0){
                        preloadImgs(function(){
                            // Start web app
                            app.run('#/');
                        }, JSON.parse(data));
                    }
                }
            });
            
        });
        

    });

})(jQuery);