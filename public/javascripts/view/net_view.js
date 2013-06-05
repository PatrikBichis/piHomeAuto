$(function(){
  // Devices viewmodel
  function Devices() {
    var self = this;

    self.units = ko.observableArray([]);

    self.waiting = ko.observable(false);

    self.loadUnits = function(){
      self.waiting(true);
      $.get("/Router/getNmap", function(data){
        self.units(JSON.parse(data));
        self.waiting(false);
      }); 
    }

    self.loadUnits();
  }

  var vm = new Devices();
  ko.applyBindings(vm);
});