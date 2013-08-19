var NetListViewModel = function () {
  var self = this;

  self.loadNet = function(){
    self.waiting(true);
    $.get("/Net/LastList", function(data){
      self.units(JSON.parse(data));
<<<<<<< HEAD:Addins/Net/ViewModels/Net.List.ViewModel.js
      $.get("/Net/List", function(data){
=======
      $.get("Net/List", function(data){
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73:Addins/Net/ViewModels/Net.List.ViewModel.js
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
