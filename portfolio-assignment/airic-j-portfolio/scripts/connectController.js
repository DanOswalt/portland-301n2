(function(module){

  // create a controller variable to attach iffe to
  var connectController = {};

  connectController.index = function(){
    console.log('init connect');
    PortfolioModule.initConnect();
  };
  
  module.connectController = connectController;
})(window);
