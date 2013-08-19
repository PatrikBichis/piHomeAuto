var NetListViewModel = function () {
  var self = this;

  self.loadNet = function(){
    self.waiting(true);
    $.get("/Net/LastList", function(data){
      self.units(JSON.parse(data));
      $.get("Net/List", function(data){
        self.units(JSON.parse(data));
        self.waiting(false);
      });
    }); 
  }

  self.units = ko.observableArray([]);

  self.waiting = ko.observable(false);

  (function () {
    self.loadNet();
  } (self));
}
