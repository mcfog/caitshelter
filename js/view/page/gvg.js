(function(){
  define(['view/base', 'app', 'backbone.joint', 'bootbox'], function(Base, app, Joint, bootbox){
    var GvgView;
    return GvgView = Base.extend({
      template: 'page/gvg',
      events: {
        'click .btn-join': 'onJoin',
        'click .btn-exit': 'onExit',
        'click .btn-fight': 'onFight'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.info();
      },
      info: function(){
        var this$ = this;
        return app.me.request('legionattack', 'info').then(function(arg$){
          var ref$, ref1$;
          (ref$ = this$.data).info = arg$.info, ref$.next = arg$.next, ref$.uinfo = arg$.uinfo;
          (ref1$ = this$.data).info = Joint._.filter(ref1$.info, function(it){
            var x0$;
            x0$ = -1 !== Joint._.indexOf([it.AttackLegion.LegionId, it.DefendLegion.LegionId, it.LegionId], it.UserLegionId.toString());
            if (x0$) {
              this$.current = it;
            }
            this$.uLgId = it.UserLegionId;
            return x0$;
          });
          return this$.renderFields('', 'info');
        });
      },
      onExit: function(event){
        var this$ = this;
        return app.me.request('legionattack', 'exit', {
          Id: this.current.Id,
          Type: 1
        }).then(function(){
          return this$.info();
        }).then(function(){
          return bootbox.alert('成功退出战场');
        }, function(it){
          return console.error(it);
        });
      },
      onJoin: function(event){
        var this$ = this;
        return this.join().then(function(){
          return bootbox.alert('成功加入');
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '加入失败');
        });
      },
      onFight: function(event){
        var this$ = this;
        return app.me.request('legionattack', 'fight', {
          Id: this.current.Id
        }).then(function(it){
          var _;
          _ = Joint._;
          return this$.data.result = it;
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '失败');
        });
      },
      join: function(){
        var this$ = this;
        return app.me.request('legionattack', 'join', {
          Id: this.current.Id,
          Type: 1
        }).then(function(member){
          this$.data.member = member;
          return this$.info();
        });
      }
    });
  });
}).call(this);
