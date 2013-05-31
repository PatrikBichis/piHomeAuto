$(function(){
  // Devices viewmodel
  function Devices() {
    var self = this;

    self.units = ko.observableArray([]);

    self.loadUnits = function(){
      $.get("/tellstick/list", function(data){
        console.log(data);
        self.units(data);
      }); 
    }

    self.deviceOn = function(unit) { 
      console.log(unit.device + "On") 
      
    }
    self.deviceOff = function(unit) { 
      console.log(unit.device + "Off") 
    }

    self.loadUnits();
  }

  var vm = new Devices();
  ko.applyBindings(vm);
});
