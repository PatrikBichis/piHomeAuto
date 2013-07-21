var MapViewModel = function () {
  var self = this;

  self.loadMap = function(){
  }

  self.units = ko.observableArray([]);

  self.waiting = ko.observable(false);

  (function () {
    self.loadMap();
  } (self));
}
