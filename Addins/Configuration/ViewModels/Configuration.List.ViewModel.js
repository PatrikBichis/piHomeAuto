var ConfigurationViewModel = function () {
  var self = this;

  self.units = ko.observableArray([]);
  self.groups = ko.observableArray([]);

  self.unitId = ko.observable();
  self.unitName = ko.observable();
  self.unitProtocol = ko.observable();
  self.unitModel = ko.observable();
  self.unitHouse = ko.observable();
  self.unitUnit = ko.observable();

  self.groupId = ko.observable();
  self.groupName = ko.observable();
  self.groupUnits = ko.observable();

  self.waiting = ko.observable(false);

  self.loadConfig = function(){
    self.waiting(true);
    $.get("/Configuration/listUnits", function(data){
      self.units(JSON.parse(data));
    }); 
    $.get("/Configuration/listGroups", function(data){
      self.groups(JSON.parse(data));
      self.waiting(false);
    }); 
  }

  self.popAddUnit = function() {
    $(document).ready(function(){
        $.Dialog({
            'title'       : 'My dialog title',
            'content'     : 'HTML content',
            'draggable'   : false,
            'overlay'     : true,
            'closeButton' : true,
            'buttonsAlign': 'right',
            'keepOpened'  : true,
            'position'    : {
                'zone'    : 'center'
            },
            'buttons'     : {
                'button1'     : {
                    'action': function(){}
                },
                'button2'     : {
                    'action': function(){}
                }
            }
        });
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
      currentvalue: false,
      map_x: 0,
      map_y: 0
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
    self.units.push(data);
    document.getElementById(id).reset();
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
      self.loadConfig();
    }
  }

  self.addNewGroup = function(){
    self.waiting(true);
    data = { 
      _id: self.groupId(),
      name: self.groupName(),
      units: self.groupUnits(),
    };
    $.ajax({
          type: "POST",
          url: "/Configuration/addGroup", // your POST target goes here
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data), // message to send goes here
          success: function (data)
          {
              self.waiting(false);
          }
    });
    self.groups.push(data);
  }

  self.deleteGroup = function(group){
    if(group !== undefined){
      self.waiting(true);
      data = { _id: group._id };
      $.ajax({
            type: "POST",
            url: "/Configuration/deleteGroup", // your POST target goes here
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data), // message to send goes here
            success: function (data)
            {
                self.waiting(false);
            }
      });
      self.loadConfig();
    }
  }

  self.dummy = function(){
    //The last function always get autorun... stupid crap
  }

  (function () {
    self.loadConfig();
  } (self));
}