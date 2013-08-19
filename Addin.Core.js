var fs = require("fs"),
    path = require("path"),
    _ = require("underscore");

function Core () {

  if (arguments.callee._singletonInstance){
    return arguments.callee._singletonInstance;
  }
  arguments.callee._singletonInstance = this;

  this.addins = [];
  this.images = [];
  this.pages = [];
  this.viewModelsFiles = [];
  this.views = [];
  this.routes = [];
  this.tiles = [];

  this.scanForAddins = function(callback, app){
  	var p = "./Addins/"
  	fs.readdir(p, function (err, files) {
  	    if (err) {
  	        throw err;
  	    }

  	    readAddinConfig(function(){
  	    	callback(addins);
  	    }, app, files, files.length, 0);

  	});
  }

  this.getAddins = function(){
    return addins;
  }

  this.getTiles = function(){
    return _.uniq(tiles);
  }

  this.getImages = function(){
    return _.uniq(images);
  }

  this.getPages = function(){
    return _.uniq(pages);
  }

  this.getViewModelFiles = function(){
    return _.uniq(viewModelsFiles);
  }

  this.getViews = function(){
    return _.uniq(views);
  }

  this.getRoutesFiles = function(){
    return _.uniq(routes);
  }

   this.getControllerRoutes = function(){
    return _.uniq(controllerRoutes);
  }

  this.copyFileSync = function(srcFile, destFile, encoding) {
    // TODO: Add errorhandling if file is not found or 
    // if not posible to save file
    var content = fs.readFileSync(srcFile);
    fs.writeFileSync(destFile, content);
  }

  this.getPageFromPages = function(pages, name){
    for (var i = 0; i < pages.length; i++) {
      if(pages[i].name === name){
        return pages[i];
      }
    };
  }

  this.installAddins = function(app, callback){
    var app = app;

    // Addin core routes
    app.get('/Addins/GetImages', function(req, res){
      res.json(JSON.stringify(getImages()));
    });

    app.get('/Addins/GetAddins', function(req, res){
      res.json(JSON.stringify(getAddins()));
    });

    app.get('/', function(req, res){
      console.log('-----------------------------------')
      console.log(getViewModelFiles())
      res.render('layout', { title: 'piHomeAuto', subTitle: 'Enheter på nätverket', routesFiles: getRoutesFiles(), viewModelFiles: getViewModelFiles() , noHeader: true});
    });

    // Scan for addins
    console.log("Scaning for addins...")
    scanForAddins(function(data){
      if(data !== undefined)
      {
        if(data.length > 0)
        {
          console.log("Found " + data.length + " addins...");
          console.log("Starting to install addins...");
          // Copy public files and overwrite existing
            // Copy uniq images
            console.log("Copyed following image files to public:");
            console.log(getImages())

            // Copy view files
            console.log("Copyed following view files to public:");
            console.log(getViews())

            // Copy uniq viewmodel files
            console.log("Copyed following viewmodel files to public:");
            console.log(getViewModelFiles())

          
          console.log("All addins are installed..");
          callback();
        }
      }
    }, app);
  }

  function writeFileWarning(file, encoding){
    var warning = "/* Auto generated file\n" +
    "*\n" +
    "* This file should not be changed, it will be\n" + 
    "* auto generated each time the app is restarted\n" +
    "*/\n" +
    "\n";

    fd = fs.openSync(file, 'w')
    fs.writeSync(fd, warning)
    fs.closeSync(fd)
  }

  function appendText(file, text, encoding){
    fd = fs.openSync(file, 'a')
    fs.writeSync(fd, text)
    fs.closeSync(fd)
  }

  function generateExpressRouteFile(callback, addin, app){
    var addin = addin;
    var app = app;
    var file = path.resolve(process.cwd(), "routes", addin.expressRouteFile+".js");
    var fileSammy = path.resolve(process.cwd(), "public", "javascripts", "Routes", addin.sammyRouteFile); 

    console.log("Generating files for addin " + addin.name);

    writeFileWarning(file, "utf8");
    writeFileWarning(fileSammy, "utf8");

    appendText(file, "var path = require('path');\n\n", "utf8");
    
    // Add requirments
    if(addin.controllerFiles.length > 0){
      for (var i = 0; i < addin.controllerFiles.length; i++) {
        var controllerFile = addin.controllerFiles[i];

        appendText(file, 'var '+controllerFile.controller+' = require(path.resolve(process.cwd(), "Addins", "'+addin.name+'", "Controllers", "'+controllerFile.controllerFile+'"));\n\n', "utf8");
      };
    }
    
    // leadin
    appendText(file, 'exports.initAddin = function(app, addin){\n', "utf8");
    appendText(file, '\tvar addin = addin;\n', "utf8");
    appendText(file, '\tvar app = app;\n\n', "utf8");

    appendText(fileSammy, "(function ($) {\n\tvar app = $.sammy('#body', function () {\n\n", "utf8");

    // add routes
    for (var i = 0; i < addin.pages.length; i++) {
      var page = addin.pages[i];

      appendText(fileSammy, '\t\tthis.'+page.name+'HtmlContainer = new this.htmlContainerObject("","");\n\n', "utf8");
      appendText(fileSammy, '\t\tthis.fetch("'+page.viewRoute+'", function (content) {\n\t\t\tapp.'+page.name+'HtmlContainer.name = "'+page.name+'";\n\t\t\tapp.'+page.name+'HtmlContainer.html = content;\n\t\t});\n\n', "utf8");
      var sammyRoute = 
      '\t\tthis.get("'+page.route+'", function (context) {\n'+
      '\t\t\tvar context = context;\n'+
      '\t\t\tif(context.app.'+page.name+'HtmlContainer.name != ""){\n';

      if(page.viewModel !== ""){
        sammyRoute += '\t\t\t\tcontext.app.swap(context.app.'+page.name+'HtmlContainer.html, '+page.viewModel+', function () { });\n';
      }else{
        sammyRoute += '\t\t\t\tcontext.app.swap(context.app.'+page.name+'HtmlContainer.html, null, function () { });\n';
      }
      
      sammyRoute += '\t\t\t}else{\n'+
      '\t\t\t\tcontext.app.fetch("'+page.viewRoute+'", function (content) {\n'+
      '\t\t\t\t\tcontext.app.'+page.name+'HtmlContainer.name = "'+page.name+'";\n'+
      '\t\t\t\t\tcontext.app.'+page.name+'HtmlContainer.html = content;\n';
      if(page.viewModel !== ""){
        sammyRoute += '\t\t\t\t\tcontext.app.swap(context.app.'+page.name+'HtmlContainer.html, '+page.viewModel+', function () { });\n'
      }else{
        sammyRoute += '\t\t\t\t\tcontext.app.swap(context.app.'+page.name+'HtmlContainer.html, null, function () { });\n'
      }
      
      sammyRoute += '\t\t\t\t});\n'+
      '\t\t\t}\n'+
      '\t\t});\n';
      appendText(fileSammy, sammyRoute, "utf8");

      appendText(file, '\tapp.get("'+page.viewRoute+'", function(req, res){\n\t\tres.render("'+page.view+'", { title: "'+page.header+'", subTitle: "'+page.description+'", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: '+page.noHeader+'});\n\t\t})\n', "utf8");
    };

    // add api routes
    appendText(file, '\t// Api routes\n', "utf8");
    if(addin.apiRoutes.length > 0){
      for (var i = 0; i < addin.apiRoutes.length; i++) {
        var apiRoute = addin.apiRoutes[i];
        appendText(file, '\tapp.'+apiRoute.type+'("'+apiRoute.route+'", '+apiRoute.controller+'.'+apiRoute.function+');\n', "utf8");
      };
    }

    // leadout
    appendText(file, '}\n', "utf8");
    appendText(fileSammy, '\n\t});\n} (jQuery));', "utf8");

    // Require router file
    var controllerInstance = require(path.resolve(process.cwd(),"routes",addin.expressRouteFile)); 

    controllerInstance.initAddin(app, this);

    routes.push(addin.sammyRouteFile);

    callback();
  }

  function getImagesFromAddin(callback, addin, array, length, i){
    var callback = callback;
    var array = array;
    var addin = addin;
    var length = length;

    if( i < length ) {
      var image = array[i];
  	  images.push(image);
      copyFileSync(path.resolve(process.cwd(), "Addins", addin.name, "Images", array[i]), path.resolve(process.cwd(), "public", "images", array[i]), "utf8");

      getImagesFromAddin(callback, addin, array, length, i + 1 );
    }else{
      callback();
    }
  }

  function getPagesFromAddin(callback, addin, array, length, i){
    var callback = callback;
    var array = array;
    var length = length;
    var addin = addin;

    if( i < length ) {
      var page = array[i];
      pages.push(page);
      var temp = array[i].viewModelFiles;
      var view = array[i].view;
    
      if(view != ""){
        views.push(view);
        copyFileSync(path.resolve(process.cwd(), "Addins", addin.name, "Views", view), path.resolve(process.cwd(), "views", view), "utf8");
      }
      if(temp.length > 0){
        for (var j = 0; j < temp.length; j++) {
          var viewModelFile = temp[j];
        
          if(viewModelFile != ""){
            viewModelsFiles.push(viewModelFile);
            copyFileSync(path.resolve(process.cwd(), "Addins", addin.name, "ViewModels", viewModelFile), path.resolve(process.cwd(), "public", "javascripts", "ViewModel", viewModelFile), "utf8");
          }
        };
      }
      

      // Check i pages should haw an tile
      if(array[i].addAsTiles){
        tiles.push({header: array[i].header, icon: array[i].tilesIcon, route: array[i].route})
      }

      getPagesFromAddin(callback, addin, array, length, i + 1 );
    }else{
      callback();
    }
  }

  function readAddinConfig(callback, app, array, length, i){
    var callback = callback;
    var app = app;
    var array = array;
    var length = length;

    if( i < length ) {
      var configInstance = require("./Addins/" + array[i] + "/Addin.Config");
      var config = new configInstance.config();
      // Read images from addin
      getImagesFromAddin(function(){
          //Read controllerRoutes from addin
          generateExpressRouteFile(function(){
            // Read pages from addin
            getPagesFromAddin(function(){
              addins.push(config);
              // read next addin
              readAddinConfig(callback, app, array, length, i + 1 );
            }, config, config.pages, config.pages.length, 0);
          }, config, app);
      }, config, config.images, config.images.length, 0);
    }else{
      callback(-1);
    }
  }
}

Core();
exports.Core = Core;


