(function(){
  var slice$ = [].slice;
  define(['backbone.joint', 'vm/socket', 'collection/deck', 'app'], function(Joint, socket, DeckCollection, app){
    var MeVM, instances;
    MeVM = Joint.ViewModel.extend({
      _socket: function(){
        return socket;
      },
      initialize: function(arg$){
        this.gid = arg$.gid;
      },
      getDeckCollection: function(){
        return DeckCollection.instance(this.gid);
      },
      getInfo: function(){
        var that, this$ = this;
        if (that = this._infoTimeout) {
          clearTimeout(that);
        }
        this._infoTimeout = setTimeout(bind$(this, 'getInfo'), 300000);
        return this.emit('info').then(function(it){
          return this$.info = it;
        }, function(){
          return alert('读取失败，请注销重试');
        });
      },
      valueOf: function(){
        return {
          info: this.info
        };
      },
      fightRank: function(times){
        return this.emit('fightrank', times);
      },
      emit: function(evt, data){
        var x0$, this$ = this;
        x0$ = this._socket().emit(evt, {
          gid: this.gid,
          data: data
        });
        x0$.then(function(){
          Joint._.defer(function(){
            return this$.sync(evt);
          });
        }, function(it){
          if (Joint._.isString(it) && it.indexOf('missing ghost') === 0) {
            alert('登录失效，请重新登录');
            location.reload();
            throw null;
          }
        });
        return x0$;
      },
      getUserCards: function(it){
        var that;
        if (that = !it && this._cards_ts > Date.now() && this._cards) {
          return that;
        } else {
          this._cards_ts = Date.now() + 1200000;
          return this._cards = app.me.request('card', 'GetUserCards').then(function(it){
            return it.Cards.map(function(it){
              var x0$;
              x0$ = it;
              x0$.Level = x0$.Level.toString();
              return x0$;
            });
          });
        }
      },
      getUserRunes: function(it){
        var that;
        if (that = !it && this._runes_ts > Date.now() && this._runes) {
          return that;
        } else {
          this._runes_ts = Date.now() + 2000000;
          return this._runes = app.me.request('rune', 'GetUserRunes').then(function(it){
            return it.Runes;
          });
        }
      },
      request: function(){
        var args, x0$;
        args = slice$.call(arguments);
        app.main.loadin();
        x0$ = this.emit('request', args);
        x0$.then(function(){
          return app.main.loadout();
        }, function(){
          return app.main.loadout();
        });
        return x0$;
      }
    });
    instances = {};
    return {
      instance: function(it){
        if (!instances[it]) {
          instances[it] = new MeVM({
            gid: it
          });
        }
        return instances[it];
      }
    };
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
