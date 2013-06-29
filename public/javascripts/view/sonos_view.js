$(function(){
  // Devices viewmodel
  function Devices() {
    var self = this;

    self.units = ko.observableArray([]);

    self.waiting = ko.observable(false);

    self.getDeviceInfo = function(){
      self.waiting(true);
      $.ajax({
            type: "POST",
            url: "/Sonos/getSonosDeviceInfo", // your POST target goes here
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({host: '192.168.0.21', port: 1400}), // message to send goes here
            success: function (data)
            {
              self.units(JSON.parse(data));
              self.waiting(false);
            }
        }); 
    }

    self.loadList = function(){
      $.get("/Sonos/listDevices", function(data) {
          self.units(JSON.parse(data));
      });
    }

    self.loadList();
  }

  var vm = new Devices();
  ko.applyBindings(vm);
});
