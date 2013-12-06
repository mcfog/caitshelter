(function(){
  define(['backbone.joint', 'dust-runtime', 'vm/meta', 'app', 'bootstrap', 'dust-helpers', 'dust-more-helpers'], function(Joint, dust, MetaVM){
    var _, dependencies, x0$, Base, ctx;
    _ = Joint._;
    dependencies = {
      'page/my/card': ['partial/myNav', 'partial/cardFilter', 'partial/card'],
      'page/my/deck': ['partial/myNav', 'partial/deck'],
      'page/my/localdeck': ['partial/myNav', 'partial/localdeck'],
      'page/my/rune': ['partial/myNav', 'partial/runeFilter', 'partial/rune'],
      'page/usersearch': ['partial/deck'],
      'page/maze': ['partial/card'],
      'page/dungeon': ['partial/card'],
      'partial/deck': ['partial/card', 'partial/rune'],
      'partial/deckeditor': ['partial/localdeck'],
      'partial/localdeck': ['partial/deck']
    };
    x0$ = Base = Joint.View.extend({
      initialize: function(){
        Joint.View.prototype.initialize.apply(this, arguments);
        return this.renderPromise = Joint._.result(this, 'renderPromise');
      },
      resolveDependency: function(root){
        var stack, result, that, i$, len$, dep;
        stack = [root, 'layout/default'];
        result = {};
        while (that = stack.pop()) {
          result[that] = true;
          if (that = dependencies[that]) {
            for (i$ = 0, len$ = that.length; i$ < len$; ++i$) {
              dep = that[i$];
              stack.push(dep);
            }
          }
        }
        return _.keys(result);
      },
      fetchTemplate: function(){
        var ref$, resolver, promise, reqs, i$, ref1$, len$, partial;
        ref$ = Joint.Deferred.defer(), resolver = ref$.resolver, promise = ref$.promise;
        reqs = ["dust/" + this.template];
        for (i$ = 0, len$ = (ref1$ = this.resolveDependency(this.template)).length; i$ < len$; ++i$) {
          partial = ref1$[i$];
          reqs.push("dust/" + partial);
        }
        require(reqs, function(it){
          return resolver.resolve(it);
        });
        return promise;
      },
      renderHtml: function(name, data){
        var ref$, resolver, promise;
        ref$ = Joint.Deferred.defer(), resolver = ref$.resolver, promise = ref$.promise;
        dust.render(name, ctx.push(data), function(err, out){
          if (err) {
            return resolver.reject(err);
          } else {
            return resolver.resolve(out);
          }
        });
        return promise;
      },
      renderPromise: function(){
        return Joint.Deferred.listen(this, ['$J:render:full:done']);
      },
      reloadMe: function(){
        var this$ = this;
        if (!Base.global.me) {
          return;
        }
        return Base.global.me.getInfo().then(function(){
          return this$.renderFields('me', 'info');
        });
      },
      mixin: function(Mixin, option){
        return new Mixin(_.extend({
          el: this.el
        }, option));
      },
      setEmuPlayer: function(p, level, deck){
        var app, this$ = this;
        app = require('app');
        app.me["emu" + p] = level + ":" + deck;
        return bootbox.confirm("已经设定为模拟玩家" + p + "，是否前往模拟战斗？", function(it){
          if (it) {
            return app.go('emufight');
          }
        });
      }
    }, {
      global: {
        toJSON: function(it){
          return it.toJSON();
        }
      },
      fetchGlobal: function(){
        var this$ = this;
        return Joint.Deferred.when(MetaVM.card(), MetaVM.skill(), MetaVM.rune()).then(function(CARD, SKILL, RUNE){
          this$.global.CARD = CARD;
          this$.global.SKILL = SKILL;
          this$.global.RUNE = RUNE;
          return this$;
        }, true);
      }
    });
    ctx = dust.makeBase(x0$.global);
    return x0$;
  });
}).call(this);
