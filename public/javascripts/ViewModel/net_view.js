var NetViewModel = function () {
  var self = this;

  self.loadNet = function(){
    self.waiting(true);
    $.get("/Nmap/LastList", function(data){
      self.units(JSON.parse(data));
      $.get("Nmap/List", function(data){
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

