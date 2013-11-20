(function(){
  define(['view/base', 'app', 'bootbox', 'backbone.joint'], function(Base, app, bootbox, Joint){
    var TYPE;
    TYPE = {
      1: '<span>神秘盗贼</span>',
      2: '<strong>精英盗贼</strong>'
    };
    return Base.extend({
      template: 'page/thief',
      events: {
        'click .btn-show': 'onShow',
        'click .btn-fight': 'onFight'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.getThieves();
      },
      onShow: function(event){
        this.$(event.currentTarget).addClass('fade');
        return this.getThieves();
      },
      onFight: function(event){
        var $t, UserThievesId, this$ = this;
        $t = this.$(event.currentTarget).addClass('fade');
        UserThievesId = $t.closest('[utid]').attr('utid');
        return app.me.request("arena", "ThievesFight", {
          UserThievesId: UserThievesId
        }).then(function(it){
          bootbox.alert("获得了金币：" + it.ExtData.Award.Coins + "； 经验值：" + it.ExtData.Award.Exp + "； \n获得卡牌请关注宝箱");
          return this$.getThieves();
        }, function(it){
          var ref$;
          bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '请求失败');
          return this$.getThieves();
        });
      },
      getThieves: function(){
        var this$ = this;
        return app.me.request("arena", "GetThieves").then(function(it){
          Joint._.each(it.Thieves, function(thief){
            thief.flee = new Date(Date.now() + thief.FleeTime * 1000).toLocaleTimeString();
            thief.desc = TYPE[thief.Type] + " Lv." + thief.ThievesId;
            return thief.status = (function(){
              switch (false) {
              case thief.Status !== 2:
                return 0;
              case !(thief.FleeTime > 0):
                return 1;
              default:
                return -1;
              }
            }());
          });
          it.cd = new Date(Date.now() + it.Countdown * 1000).toLocaleTimeString();
          return this$.updateInfo(it);
        });
      },
      updateInfo: function(info){
        this.data.info = info;
        return this.renderFields('', 'info');
      }
    });
  });
}).call(this);
