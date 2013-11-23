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
      },
      unrune: function(urid){
        this.set('urids', Joint._.filter(this.get('urids'), function(it){
          return it !== urid;
        }));
        return this.save();
      },
      uprune: function(urid){
        var x0$, urids;
        x0$ = urids = this.get('urids') || [];
        if (urids.length >= 4) {
          return;
        }
        x0$.push(urid);
        this.set('urids', Joint._.uniq(urids));
        return this.save();
      }
    });
  });
}).call(this);
