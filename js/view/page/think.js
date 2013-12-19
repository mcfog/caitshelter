(function(){
  define(['view/base', 'app', 'backbone.joint', 'bootbox'], function(Base, app, Joint, bootbox){
    var _, ThinkView, NPCLIST, FRAGLIST, GRAYLIST;
    _ = Joint._;
    ThinkView = Base.extend({
      template: 'page/think',
      events: {
        'click .btn-get': 'onGet',
        'click .btn-think': 'onThink',
        'click .btn-batch': 'onBatch'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        this.data.npc = NPCLIST.reverse();
        this.data.FRAGLIST = FRAGLIST;
        return this.getInfo();
      },
      onGet: function(event){
        return this.get();
      },
      onThink: function(event){
        var npc;
        npc = parseInt(this.$(event.currentTarget).attr('npc'));
        if (!npc) {
          return;
        }
        return this.think(npc);
      },
      onBatch: function(event){
        var budget;
        budget = parseInt(this.$(event.currentTarget).attr('budget'));
        if (!budget) {
          return;
        }
        return this.batch(budget);
      },
      get: function(){
        var this$ = this;
        return app.me.request('meditation', 'Deal').then(function(rst){
          return this$.getInfo().then(function(){
            return rst;
          });
        });
      },
      think: function(NpcId){
        var this$ = this;
        return app.me.request('meditation', 'Npc', {
          NpcId: NpcId
        }).then(function(it){
          this$.updateNpc(it.NpcList);
          this$.updateCoins(it.Coins);
          this$.data.info.list.push(toShow(it.AwardItem));
          return this$.flush();
        });
      },
      batch: function(budget){
        var x0$, this$ = this;
        budget = budget - 7999;
        if (app.me.info.Coins < budget) {
          bootbox.alert('金币不足>_<');
          return;
        }
        x0$ = recur;
        x0$.target = app.me.info.Coins - budget;
        x0$.rewards = [];
        x0$.hole = 10;
        function recur(){
          if (app.me.info.Coins < recur.target) {
            return this$.get().then(handleGet).then(function(){
              return recur.rewards;
            });
          }
          return this$.think(this$.currentNpc).then(function(){
            recur.hole--;
            if (recur.hole === 0) {
              return this$.get().then(handleGet);
            } else {
              return true;
            }
          }).then(function(){
            return recur();
          });
        }
        function handleGet(it){
          var i$, ref$, len$, item;
          for (i$ = 0, len$ = (ref$ = it.Rewards).length; i$ < len$; ++i$) {
            item = ref$[i$];
            recur.rewards.push(item);
          }
          recur.hole = 10;
          return true;
        }
        return this.get().then(function(){
          return recur();
        }).then(function(it){
          debugger;
          this$.data.info.list = _.chain(it).sortBy("Type").map(toShow).value();
          this$.flush();
          return bootbox.alert('冥想完毕');
        });
      },
      getInfo: function(){
        var this$ = this;
        return Joint.Deferred.when(app.me.request('meditation', 'Info'), Base.fetchGlobal()).then(function(it){
          var x0$;
          x0$ = this$.data.info = it;
          this$.updateNpc(x0$.NpcList);
          this$.updateCoins(x0$.Coins);
          x0$.list = _.map(x0$.AwardList, toShow);
          return this$.flush();
        });
      },
      flush: function(){
        this.renderFields('', 'info');
        this.renderFields('me', 'info');
      },
      updateCoins: function(it){
        app.me.info.Coins = it;
      },
      updateNpc: function(list){
        var this$ = this;
        _.each(this.data.npc, function(it){
          return it.disable = true;
        });
        _.each(list, function(it){
          _.find(this$.data.npc, {
            id: it
          }).disable = false;
        });
        this.currentNpc = _.max(list);
      }
    });
    function toShow(arg$){
      var Type, Value, Num, x0$, rune, x1$, x2$;
      Type = arg$.Type, Value = arg$.Value, Num = arg$.Num;
      switch (Type) {
      case 1:
        x0$ = _.findWhere(FRAGLIST, {
          lv: Value
        });
        if (Num) {
          x0$.num = Num;
        }
        return x0$;
        break;
      case 2:
        rune = _.find(Base.global.RUNE, function(it){
          return it.RuneId == Value;
        });
        if (rune) {
          x1$ = {
            name: rune.RuneName,
            img: "http://d.muhecdn.com/mkhx/public/swf/rune/110_110_no/rune_" + rune.RuneId + ".png"
          };
          if (Num) {
            x1$.num = Num;
          }
          return x1$;
        } else {
          return null;
        }
        break;
      case 3:
        x2$ = clone$(GRAYLIST[Value - 1]);
        if (Num) {
          x2$.num = Num;
        }
        return x2$;
      }
    }
    NPCLIST = [
      {
        id: 1,
        name: "守卫",
        price: 2000
      }, {
        id: 2,
        name: "神官",
        price: 4000
      }, {
        id: 3,
        name: "智者",
        price: 6000
      }, {
        id: 4,
        name: "先知",
        price: 8000
      }
    ];
    FRAGLIST = [
      {
        lv: 3,
        name: '蓝色碎片',
        color: 'blue',
        img: "image/frag3.png"
      }, {
        lv: 4,
        name: '紫色碎片',
        color: 'purple',
        img: "image/frag4.png"
      }, {
        lv: 5,
        name: '金色碎片',
        color: 'gold',
        img: "image/frag5.png"
      }
    ];
    GRAYLIST = [
      {
        name: "破碎的符文",
        img: "image/grey0.png"
      }, {
        name: "遗失的符文",
        img: "image/grey1.png"
      }, {
        name: "奇怪的符文",
        img: "image/grey2.png"
      }, {
        name: "断裂的符文",
        img: "image/grey3.png"
      }, {
        name: "孩子的涂鸦",
        img: "image/grey4.png"
      }
    ];
    return ThinkView;
  });
  function clone$(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
}).call(this);
