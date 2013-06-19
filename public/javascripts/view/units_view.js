$(function(){
  // Devices viewmodel
  function Devices() {
    var self = this;

    self.units = ko.observableArray([]);

    self.waiting = ko.observable(false);

    self.loadUnits = function(){
      self.waiting(true);
      $.get("/tellstick/list", function(data){
        self.units(JSON.parse(data));
        self.waiting(false);
      }); 
    }

    self.sendDeviceValue = function(data){
      self.waiting(true);
      $.ajax({
            type: "POST",
            url: "/Tellstick/SetDevice", // your POST target goes here
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data), // message to send goes here
            success: function (data)
            {
                self.units(JSON.parse(data));
                self.waiting(false);
            }
        }); 
    }

    self.deviceClicked = function(unit){
        
        var data = {id : unit.id, newValue : unit.currentValue};

        self.sendDeviceValue(data);
    }

    self.deviceOn = function(unit) { 
      if(unit.currentValue !== true){
        var data = {unitAdress : unit.id, newValue : true};

        self.sendDeviceValue(data);
      }
    }

    self.deviceOff = function(unit) { 
      if(unit.currentValue !== false){
        var data = {unitAdress : unit.id, newValue : false};

        self.sendDeviceValue(data);
      }
    }

    self.loadUnits();
  }

  var vm = new Devices();
  ko.applyBindings(vm);
});
