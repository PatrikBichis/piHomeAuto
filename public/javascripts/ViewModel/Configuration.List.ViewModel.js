var ConfigurationViewModel = function () {
  var self = this;

  self.units = ko.observableArray([]);

  self.unitId = ko.observable();
  self.unitName = ko.observable();
  self.unitProtocol = ko.observable();
  self.unitModel = ko.observable();
  self.unitHouse = ko.observable();
  self.unitUnit = ko.observable();

  self.waiting = ko.observable(false);

  self.loadConfig = function(){
    self.waiting(true);
    $.get("/Configuration/listUnits", function(data){
      self.units(JSON.parse(data));
      self.waiting(false);
    }); 
  }

 self.addNewUnit = function(){
    self.waiting(true);
    data = { 
      _id: self.unitId(),
      name: self.unitName(),
      protocol: self.unitProtocol(),
      model: self.unitModel(),
      house: self.unitHouse(),
      unit: self.unitUnit(),
      currentvalue: false
    };
    $.ajax({
          type: "POST",
          url: "/Configuration/addUnit", // your POST target goes here
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data), // message to send goes here
          success: function (data)
          {
              self.waiting(false);
          }
    });
  }

self.deleteUnit = function(unit){
    if(unit !== undefined){
      self.waiting(true);
      data = { _id: unit._id };
      $.ajax({
            type: "POST",
            url: "/Configuration/deleteUnit", // your POST target goes here
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data), // message to send goes here
            success: function (data)
            {
                self.waiting(false);
            }
      });
    }
  }

  self.dummy = function(){
    //The last function always get autorun... stupid crap
  }

  (function () {
    self.loadConfig();
  } (self));
}