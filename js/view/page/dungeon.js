(function(){
  define(['view/base', 'app', 'backbone.joint', 'vm/meta', 'bootbox'], function(Base, app, Joint, MetaVM, bootbox){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/dungeon',
      events: {
        'click .btn-fight': 'onFight'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.getStatus();
      },
      onFight: function(event){
        var layer, this$ = this;
        layer = parseInt(this.$(event.currentTarget).attr('layer'));
        if (!layer) {
          return;
        }
        return Joint.Deferred.when(app.me.request('dungeon', 'Fight', {
          isManual: 0,
          Layer: layer
        }), Base.fetchGlobal()).then(function(it){
          var x0$, x1$;
          x0$ = this$.data.result = it;
          x1$ = x0$.ExtData;
          x1$.AwardChips = _.map(x1$.AwardChips, function(chip){
            var x2$;
            x2$ = chip = _.extend({}, chip, Base.global.CARD[chip.ChipId]);
            x2$.CardName = x2$.CardName + " x " + chip.Num;
            return x2$;
          });
          return x0$;
        }).then(function(){
          return this$.getStatus();
        }).then(function(){
          return this$.renderFields('', 'result');
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
        });
      },
      getStatus: function(){
        var this$ = this;
        return app.me.request('dungeon', 'GetUserDungeon').then(function(it){
          var x0$;
          x0$ = this$.data.status = it;
          x0$.layer = x0$.UserDungeon.CurrentLayer + 1;
          x0$.Condition = _.indexBy(x0$.DungeonConditions, 'Layer')[x0$.layer];
          return this$.renderFields('', 'status');
        });
      }
    });
  });
}).call(this);
