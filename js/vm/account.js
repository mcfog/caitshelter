(function(){
  define(['backbone.joint', 'collection/account', 'vm/socket', 'vm/me'], function(arg$, AccCollection, socket, MeVM){
    var ViewModel, AccVM;
    ViewModel = arg$.ViewModel;
    AccVM = ViewModel.extend({
      collection: new AccCollection,
      initialize: function(){
        var this$ = this;
        this.collection.on('sync remove', function(){
          return this$.sync();
        });
        return this.once('$J:sync:start', function(){
          return this$.collection.fetch();
        });
      },
      toJSON: function(){
        return this.collection.map(function(it){
          var x0$, that;
          x0$ = it.toJSON();
          x0$.login = it.login;
          if (that = it.me) {
            x0$.me = that.valueOf();
          }
          return x0$;
        });
      },
      login: function(account){
        var this$ = this;
        account.login = true;
        return socket.emit('etc/login', {
          sid: account.get('sid')
        }).then(function(it){
          var x0$;
          x0$ = account.me = MeVM.instance(it);
          this$.stopListening(x0$);
          this$.listenTo(x0$, '$J:sync', function(it){
            return this$.sync("me." + it);
          });
          x0$.getInfo().then(function(it){
            var x1$;
            x1$ = account.set({
              NickName: it.NickName,
              Avatar: it.Avatar
            });
            x1$.save();
            return x1$;
          });
          return x0$;
        });
      }
    });
    return new AccVM;
  });
}).call(this);
