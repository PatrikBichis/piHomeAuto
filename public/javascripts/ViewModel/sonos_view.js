var SonosViewModel = function () {
  var self = this;

  self.units = ko.observableArray([]);

  self.waiting = ko.observable(false);

  self.loadSonos = function(){
    $.get("/Sonos/listDevices", function(data) {
        self.units(JSON.parse(data));
    });
  }

  self.postData = function(callback, service, data){
    $.ajax({
      type: "POST",
      url: "/Sonos/"+service, // your POST target goes here
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data), // message to send goes here
      success: callback
    }); 
  }

  self.getDeviceInfo = function(data){
    self.waiting(true);

    self.postData(function(data){
      self.units(JSON.parse(data));
      self.waiting(false);
    }, "getSonosDeviceInfo", data);
  }

  self.sendCommand = function(command, data){
    if(command !== undefined && data !== undefined){
      self.waiting(true);

      self.postData(function(data){
        self.waiting(false);
        self.units(JSON.parse(data));
      }, command, data);
    }
  }

  self.infoClicked = function(data){
    if(data !== undefined){
      self.getDeviceInfo(data);
    }
  }

  self.playClicked= function(data){
    if(data !== undefined){
      self.sendCommand("play", data);
    }
  }

  self.pauseClicked= function(data){
    if(data !== undefined){
      self.sendCommand("pause", data);
    }
  }

  self.stopClicked= function(data){
    if(data !== undefined){
      self.sendCommand("stop", data);
    }
  }

  self.muteClicked= function(data){
    if(data !== undefined){
      if(data.muted){
        self.sendCommand("muteOff", data);
      }else{
        self.sendCommand("muteOn", data);
      }
    }
  }

  (function () {
    self.loadSonos();
  } (self));

}

  //var t = setInterval(function(){
  //  loadList();
  //}, 500);

