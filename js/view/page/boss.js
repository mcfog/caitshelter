(function(){
  define(['view/base', 'app', 'bootbox', 'backbone.joint'], function(Base, app, bootbox, Joint){
    return Base.extend({
      template: 'page/boss',
      events: {
        'click .btn-start': 'onStart',
        'click .btn-show': 'onShow'
      },
      onShow: function(event){
        var this$ = this;
        return app.me.request("boss", "GetBoss").then(function(it){
          return this$.updateInfo(it);
        });
      },
      onStart: function(event){
        this.$(event.currentTarget).hide();
        return (function(view){
          var this$ = this;
          function main(){
            return this$.request("boss", "GetBoss").then(function(it){
              view.updateInfo(it);
              switch (false) {
              case it.Boss.BossCurrentHp != 0:
                return 'hp=0';
              case it.CanFightTime != 0:
                return this$.request("boss", "Fight").then(function(){
                  return this$.request("boss", "GetFightData").then(function(){
                    return setTimeout(bind$(view, 'onShow'), 5000);
                  }, function(){});
                }).then(main);
              default:
                return delay(Math.min(30000, it.CanFightTime * 700)).then(main);
              }
            }, main);
          }
          function delay(ms){
            var ref$, resolver, promise;
            ref$ = Joint.Deferred.defer(), resolver = ref$.resolver, promise = ref$.promise;
            setTimeout(resolver.resolve, ms);
            return promise;
          }
          return main();
        }.call(app.me, this));
      },
      updateInfo: function(info){
        this.data.info = info;
        return this.renderFields('', 'info');
      }
    });
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
