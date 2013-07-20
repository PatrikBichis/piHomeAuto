var MapViewModel = function () {
  var self = this;

  self.loadMap = function(){
   console.log('loading map viewmodel');
  }

  self.units = ko.observableArray([]);

  self.waiting = ko.observable(false);

  (function () {
    self.loadMap();
  } (self));
}
