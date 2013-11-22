(function(){
  define(['backbone', 'backbone.joint'], function(Backbone, Joint){
    return Backbone.Model.extend({
      uncard: function(ucid){
        this.set('ucids', Joint._.filter(this.get('ucids'), function(it){
          return it !== ucid;
        }));
        return this.save();
      },
      upcard: function(ucid){
        var x0$, ucids;
        x0$ = ucids = this.get('ucids') || [];
        if (ucids.length >= 10) {
          return;
        }
        x0$.push(ucid);
        this.set('ucids', Joint._.uniq(ucids));
        return this.save();
      }
    });
  });
}).call(this);
