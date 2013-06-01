$(function(){
  // Devices viewmodel
  function Devices() {
    var self = this;

    self.units = ko.observableArray([]);

    self.loadUnits = function(){
      $.get("/tellstick/list", function(data){
        self.units(JSON.parse(data));
      }); 
    }

    self.sendDeviceValue = function(data){
      $.ajax({
            type: "POST",
            url: "/Tellstick/SetDevice", // your POST target goes here
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data), // message to send goes here
            success: function (data)
            {
                self.units(JSON.parse(data));
            }
        }); 
    }

    self.deviceClicked = function(unit){
        
        var data = {unitAdress : unit.unitAdress, newValue : unit.currentValue};

        self.sendDeviceValue(data);
    }

    self.deviceOn = function(unit) { 
      if(unit.currentValue !== true){
        var data = {unitAdress : unit.unitAdress, newValue : true};

        self.sendDeviceValue(data);
      }
    }

    self.deviceOff = function(unit) { 
      if(unit.currentValue !== false){
        var data = {unitAdress : unit.unitAdress, newValue : false};

        self.sendDeviceValue(data);
      }
    }

    self.loadUnits();
  }

  var vm = new Devices();
  ko.applyBindings(vm);
});
