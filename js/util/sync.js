(function(){
  define(['backbone.storageEngine'], function(SE){
    return SE.Router.LateBind.createSync(function(method, model, options){
      if (window.chrome && chrome.storage) {
        return SE.Engine.ChromeStorage.construct((model.collection || (model.collection = {})).name || model.name, 'sync');
      } else {
        return SE.Engine.LocalStorage.construct((model.collection || (model.collection = {})).name || model.name);
      }
    });
  });
}).call(this);
