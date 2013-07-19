var GroupsViewModel = function () {
  var self = this;

  self.groups = ko.observableArray([]);

  self.waiting = ko.observable(false);

  self.loadGroups = function(){
    self.waiting(true);
    $.get("/Control/ListGroups", function(data){
      self.groups(JSON.parse(data));
      self.waiting(false);
    }); 
  }

  self.sendDeviceValue = function(data){
    self.waiting(true);
    $.ajax({
          type: "POST",
          url: "/Control/SetGroup", // your POST target goes here
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data), // message to send goes here
          success: function ()
          {
              self.waiting(false);
          }
      }); 
  }

  self.groupOff = function(group) { 
    if(group !== undefined){
      var data = {units : group.units, value : false};
      console.log(data);
      self.sendDeviceValue(data);
    }
  }

  self.groupOn = function(group) { 
    if(group !== undefined){
      var data = {units : group.units, value : true};
      console.log(data);
      self.sendDeviceValue(data);
    }
  }

  self.temp = function(){
    
  }

  (function () {
    self.loadGroups();
  } (self));

}

