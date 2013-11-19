(function(){
  define(['backbone', 'backbone.joint', 'backbone.localStorage'], function(Backbone, Joint){
    var Base;
    Base = Backbone.Collection.extend({});
    Object.defineProperty(Base.prototype, 'localStorage', {
      configurable: true,
      get: function(){
        var x0$;
        x0$ = new Backbone.LocalStorage(Joint._.result(this, 'name'));
        Object.defineProperty(this, 'localStorage', {
          value: x0$
        });
        return x0$;
      }
    });
    return Base;
  });
}).call(this);
