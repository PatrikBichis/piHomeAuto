$(function(){
  // Devices viewmodel
  function Devices() {
    var self = this;

    self.groups = ko.observableArray([]);

    self.waiting = ko.observable(false);

    self.loadGroups = function(){
      self.waiting(true);
      $.get("/Controll/ListGroups", function(data){
        self.groups(JSON.parse(data));
        self.waiting(false);
      }); 
    }

    self.sendDeviceValue = function(data){
      self.waiting(true);
      $.ajax({
            type: "POST",
            url: "/Controll/SetGroup", // your POST target goes here
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data), // message to send goes here
            success: function ()
            {
                self.waiting(false);
            }
        }); 
    }

    self.groupOn = function(group) { 
      var data = {units : group.units, value : true};
      console.log(data);
      self.sendDeviceValue(data);
    }

    self.groupOff = function(group) { 
      var data = {units : group.units, value : false};
      self.sendDeviceValue(data);
    }

    self.loadGroups();
  }

  var vm = new Devices();
  ko.applyBindings(vm);
});