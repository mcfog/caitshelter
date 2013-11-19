(function(){
  define(['view/base', 'app', 'backbone.joint', 'bootbox'], function(Base, app, Joint, bootbox){
    var SalaryView, LANG;
    SalaryView = Base.extend({
      template: 'page/salary',
      events: {
        'click .btn-get': 'onGet'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.loadList();
      },
      loadList: function(){
        var this$ = this;
        return app.me.request('user', 'GetUserSalary').then(function(it){
          this$.data.list = Joint._.map(it.SalaryInfos, function(it){
            var x0$, d;
            x0$ = it;
            x0$.reason = LANG["Award_type_" + x0$.Type];
            x0$.content = LANG["Award_" + x0$.AwardType];
            d = new Date(1000 * x0$.Time);
            x0$.date = d.toLocaleString();
            return x0$;
          });
          return this$.renderFields('', 'list');
        });
      },
      onGet: function(event){
        var this$ = this;
        return app.me.request('user', 'AwardSalary').then(function(){
          return Joint.Deferred.when(this$.reloadMe(), this$.loadList());
        }).then(function(){
          return bootbox.alert('领取完毕');
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '领取失败');
        });
      }
    });
    LANG = {
      Award_type_1: "关卡奖励",
      Award_type_2: "等级奖励",
      Award_type_3: "签到奖励",
      Award_type_4: "打败神秘盗贼奖励",
      Award_type_5: "打败精英盗贼奖励",
      Award_type_6: "排名奖励",
      Award_type_7: "邀请奖励",
      Award_type_8: "魔神战 排名奖励",
      Award_type_9: "魔神战 功勋奖励",
      Award_type_10: "魔神战 最后一击奖励",
      Award_type_11: "魔神战 参战奖励",
      Award_type_12: "魔幻碎片合成",
      Award_type_13: "军团战奖励",
      Award_type_14: "卡牌大乱斗",
      Award_1: "游戏币",
      Award_2: "晶钻",
      Award_3: "魔幻券",
      Award_4: "卡牌",
      Award_5: "符文"
    };
    return SalaryView;
  });
}).call(this);
