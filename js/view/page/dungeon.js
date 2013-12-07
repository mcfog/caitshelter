(function(){
  define(['view/base', 'app', 'backbone.joint', 'vm/meta', 'bootbox', 'vm/deck'], function(Base, app, Joint, MetaVM, bootbox, DeckVM){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/dungeon',
      events: {
        'click .btn-fight': 'onFight',
        'click .btn-sweep': 'onSweep',
        'click .btn-emu': 'onEmu'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.getStatus();
      },
      onSweep: function(event){
        var this$ = this;
        return Joint.Deferred.when(app.me.request('dungeon', 'Sweep'), Base.fetchGlobal()).then(function(it){
          var CARD, A, msg;
          CARD = Base.global.CARD;
          A = it.Award;
          msg = ['扫荡成果'];
          msg.push("金币" + A.Coins);
          msg.push("经验" + A.Exp);
          msg.push("怒气" + A.Anger);
          _.each(A.Cards, function(it){
            return msg.push("卡牌 " + CARD[it.CardId].CardName + " * " + it.Num);
          });
          _.each(A.Chips, function(it){
            return msg.push("碎片 " + CARD[it.ChipId].CardName + " * " + it.Num);
          });
          return bootbox.alert(msg.join('<br>'));
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
        });
      },
      onEmu: function(event){
        var Layer, p, this$ = this;
        Layer = parseInt(this.$(event.currentTarget).closest('[layer]').attr('layer'));
        if (!Layer) {
          return;
        }
        p = parseInt(this.$(event.currentTarget).attr('p'));
        if (!p) {
          return;
        }
        return app.me.request('dungeon', 'GetStrategy', {
          Layer: Layer
        }).then(function(it){
          var BattleId, ref$;
          BattleId = (ref$ = it.pop()) != null ? ref$.Url.match(/BattleId=(\w+)/)[1] : void 8;
          if (!BattleId) {
            return bootbox.alert('没有人通过此关，脸帝你个变态！');
          }
          return app.me.request('dungeon', 'ShowRecord', {
            Layer: Layer,
            BattleId: BattleId
          });
        }).then(function(it){
          return Joint.Deferred.when(it.DefendPlayer.Level, DeckVM.dumpPlayerDeck(it.DefendPlayer));
        }).then(function(level, deck){
          return this$.setEmuPlayer(p, level, deck);
        });
      },
      onFight: function(event){
        var layer, this$ = this;
        layer = parseInt(this.$(event.currentTarget).closest('[layer]').attr('layer'));
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
          x0$.AwardCards = _.map(x0$.AwardCards, function(card){
            return card = _.extend({}, card, Base.global.CARD[card]);
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
          x0$.layer = 1 + parseInt(x0$.UserDungeon.CurrentLayer);
          x0$.Condition = _.indexBy(x0$.DungeonConditions, 'Layer')[x0$.layer];
          return this$.renderFields('', 'status');
        });
      }
    });
  });
}).call(this);
