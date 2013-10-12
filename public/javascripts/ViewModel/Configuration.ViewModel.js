var ConfigurationViewModel = function () {
  var self = this;

  self.units = ko.observableArray([]);
  self.groups = ko.observableArray([]);

  self.waiting = ko.observable(false);

  self.loadUnits = function(){
    self.waiting(true);
    $.get("/Units/List", function(data){
      self.units(JSON.parse(data));
      self.waiting(false);
    }); 
  }

 self.loadGroups = function(){
    self.waiting(true);
    $.get("/Control/ListGroups", function(data){
      self.groups(JSON.parse(data));
      self.waiting(false);
    }); 
  }


  (function () {
    self.loadUnits();
  } (self));
}

