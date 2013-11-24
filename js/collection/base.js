(function(){
  define(['backbone', 'util/sync'], function(Backbone, sync){
    var Base;
    Base = Backbone.Collection.extend({
      sync: sync,
      model: Backbone.Model.extend({
        sync: sync
      })
    });
    return Base;
  });
}).call(this);
