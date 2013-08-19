var SystemInfoViewModel = function () {
  var self = this;

  self.loadTemps = function(){
    self.waiting(true);
      $.get("/pitemp", function(data){
        self.pitemp(JSON.parse(data));
        self.waiting(false);
      });
  }

  self.pitemp = ko.observableArray([]);

  self.waiting = ko.observable(false);


  (function () {
    self.loadTemps();
  } (self));
}