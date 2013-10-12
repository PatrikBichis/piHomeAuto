var ConfigViewModel = function () {
  var self = this;

  self.units = ko.observableArray([]);

  self.waiting = ko.observable(false);

  self.loadUnits = function(){
    self.waiting(true);
      var testdata = {['a','b','b']};
      self.units(JSON.parse(data));
      self.waiting(false);
    }); 
  }

  (function () {
     //self.loadUnits();
  } (self));
}