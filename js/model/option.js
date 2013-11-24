(function(){
  define(['backbone', 'util/sync'], function(Backbone, sync){
    var OptionModel, x0$, instance;
    OptionModel = Backbone.Model.extend({
      name: 'option',
      id: '0',
      sync: sync
    }, {
      get: function(it){
        return instance.get(it);
      },
      set: function(k, v){
        instance.set(k, v);
        return instance.save();
      }
    });
    x0$ = instance = new OptionModel;
    x0$.fetch();
    return OptionModel;
  });
}).call(this);
