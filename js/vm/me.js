(function(){
  var slice$ = [].slice;
  define(['backbone.joint', 'vm/socket'], function(Joint, socket){
    var MeVM, instances;
    MeVM = Joint.ViewModel.extend({
      _socket: function(){
        return socket;
      },
      initialize: function(arg$){
        this.gid = arg$.gid;
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
        });
        return x0$;
      },
      request: function(){
        var args;
        args = slice$.call(arguments);
        return this.emit('request', args);
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
