(function(){
  define(['backbone.joint', 'dust-runtime', 'lodash', 'vm/meta', 'bootstrap', 'dust-helpers', 'dust-more-helpers'], function($J, dust, _, MetaVM){
    var dependencies, x0$, Base, ctx;
    dependencies = {
      'page/my/card': ['partial/myNav', 'partial/cardFilter', 'partial/card'],
      'page/my/deck': ['partial/myNav', 'partial/deck'],
      'page/my/rune': ['partial/myNav', 'partial/runeFilter', 'partial/rune'],
      'page/friend': ['partial/myNav', 'partial/deck'],
      'page/maze': ['partial/card'],
      'partial/deck': ['partial/card', 'partial/rune']
    };
    x0$ = Base = $J.View.extend({
      initialize: function(){
        $J.View.prototype.initialize.apply(this, arguments);
        return this.renderPromise = $J._.result(this, 'renderPromise');
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
        ref$ = $J.Deferred.defer(), resolver = ref$.resolver, promise = ref$.promise;
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
        ref$ = $J.Deferred.defer(), resolver = ref$.resolver, promise = ref$.promise;
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
        return $J.Deferred.listen(this, ['$J:render:full:done']);
      },
      reloadMe: function(){
        var this$ = this;
        if (!Base.global.me) {
          return;
        }
        return Base.global.me.getInfo().then(function(){
          return this$.renderFields('me', 'info');
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
        return $J.Deferred.when(MetaVM.card(), MetaVM.skill(), MetaVM.rune()).then(function(CARD, SKILL, RUNE){
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
