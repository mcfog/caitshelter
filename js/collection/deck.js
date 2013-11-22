(function(){
  define(['collection/base', 'model/deck'], function(Base, DeckModel){
    var instances;
    instances = {};
    return Base.extend({
      constructor: function(arg$){
        var gid;
        gid = arg$.gid;
        if (!gid) {
          throw 'falsy gid';
        }
        Base.prototype.constructor.apply(this, arguments);
        this.name = "deck-" + gid;
        return this;
      },
      model: DeckModel
    }, {
      instance: function(gid){
        var that;
        if (that = instances[gid]) {
          return that;
        } else {
          return instances[gid] = new this({
            gid: gid
          });
        }
      }
    });
  });
}).call(this);
