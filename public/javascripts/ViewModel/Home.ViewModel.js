var HomeViewModel = function () {
  var self = this;

 // self.tiles = ko.observableArray([]);

  self.loadTiles = function(){
    /*
    $.get("/Tiles", function(data){
      self.tiles(JSON.parse(data));

      var tilesData = [];
      tilesData = JSON.parse(data);
      
      for (var i = 0; i < tilesData.length; i++) {

      	var tile = '<a href="'+tilesData[i].route+'">\n\t'+
	      '<div class="tile icon bg-color-blue">\n\t\t'+
	      '<div class="tile-content">\n\t\t\t'+
	      '<img src="'+tilesData[i].icon+'">\n\t\t\t'+
	      '</div>\n\t\t'+
	      '<div class="brand">\n\t\t\t'+
	      '<span class="name">'+tilesData[i].header+'</span>\n\t\t'+
	      '</div>\n\t\t'+
	      '</div>\n\t'+
	      '</a>\n\n';
      	
      	$('content').append(tile);
      };     
    }); 
	*/
  }

  //self.loadTiles();

  (function () {
    
  } (self));
}

