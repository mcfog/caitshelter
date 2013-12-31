(function(){
  define(['view/base', 'app', 'backbone.joint', 'bootbox'], function(Base, app, Joint, bootbox){
    var _, when;
    _ = Joint._;
    when = Joint.Deferred.when;
    return Base.extend({
      template: 'page/map',
      events: {
        'click .btn-clear': 'onClear',
        'click .btn-explore': 'onExplore'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.getInfo();
      },
      onClear: function(it){
        var $target, msid;
        $target = this.$(it.currentTarget).addClass('fade');
        msid = parseInt($target.closest('[msid]').attr('msid'));
        if (!msid) {
          return;
        }
        return this.clear(msid);
      },
      onExplore: function(it){
        var $target, msid;
        $target = this.$(it.currentTarget);
        msid = parseInt($target.closest('[msid]').attr('msid'));
        if (!msid) {
          return;
        }
        return this.explore(msid);
      },
      clear: function(MapStageDetailId){
        var this$ = this;
        return when(app.me.request('mapstage', 'EditUserMapStages', {
          MapStageDetailId: MapStageDetailId,
          isManual: 0
        }), Base.fetchGlobal()).then(function(it){
          return bootbox.alert(this$.bonus2str(it.ExtData));
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
        });
      },
      explore: function(MapStageDetailId){
        var this$ = this;
        return when(app.me.request('mapstage', 'Explore', {
          MapStageDetailId: MapStageDetailId
        }), Base.fetchGlobal()).then(function(it){
          return bootbox.alert(this$.bonus2str(it));
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
        });
      },
      bonus2str: function(arg$){
        var Bonus, ThievesInfo;
        Bonus = arg$.Bonus, ThievesInfo = arg$.ThievesInfo;
        return _.chain(Bonus).map(function(it){
          return it.split('_');
        }).map(function(it){
          var card;
          switch (it[0]) {
          case 'Exp':
            return "经验值 " + it[1];
          case 'Coins':
            return "金币 " + it[1];
          case 'Chip':
            return "魔幻碎片 " + it[1];
          case 'Card':
            card = Base.global.CARD[it[1]];
            return "卡牌 " + card.CardName;
          default:
            return it.join(':');
          }
        }).tap(function(it){
          if (ThievesInfo) {
            return it.push("盗贼出现");
          }
        }).value().join('<br>');
      },
      getInfo: function(){
        var this$ = this;
        return app.me.request('mapstage', 'GetUserMapStages').then(function(maps){
          this$.data.stages = _.chain(maps).groupBy('MapStageId').map(function(maps, stage){
            return {
              maps: maps,
              stage: stage
            };
          }).value().reverse();
          return this$.flush();
        });
      },
      flush: function(){
        this.renderFields('', 'stages');
      }
    });
  });
}).call(this);
