(function(){
  define(['view/base', 'bootbox', 'vm/account', 'app'], function(Base, bootbox, accountVM, app){
    return Base.extend({
      template: 'page/account',
      events: {
        'click .btn-add': 'onAddAccount',
        'click .btn-del': 'onDelAccount',
        'click .btn-login': 'onLogin',
        'click .btn-enter': 'onEnter'
      },
      initialize: function(){
        var x0$, this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        Base.global.me = app.me = null;
        x0$ = this.vm = accountVM;
        x0$.collection.once('sync', function(it){
          var that, account;
          if (it !== this$.vm.collection) {
            return;
          }
          if (that = localStorage.lastAccountId) {
            account = this$.vm.collection.get(that);
            return this$.login(account).then(function(){
              return this$.enter(account);
            });
          } else {
            if (that = this$.vm.collection.at(0)) {
              return this$.login(that);
            }
          }
        });
        this.sync('accounts', x0$);
        return x0$;
      },
      serializeData: function(){
        var x0$;
        x0$ = Base.prototype.serializeData.apply(this, arguments);
        x0$.accounts = x0$.accounts.toJSON();
        return x0$;
      },
      onAddAccount: function(event){
        var this$ = this;
        return bootbox.prompt('sid', function(sid){
          if (!sid) {
            return;
          }
          return this$.vm.collection.create({
            sid: sid
          }).save();
        });
      },
      onDelAccount: function(event){
        var x0$, target, this$ = this;
        x0$ = target = this.getTarget(event.target);
        if (!x0$) {
          return;
        }
        return bootbox.confirm("确认要删除账户[" + target.get('sid') + "]", function(it){
          if (!it) {
            return;
          }
          return target.destroy();
        });
      },
      onLogin: function(event){
        var x0$, target, this$ = this;
        x0$ = target = this.getTarget(event.target);
        if (!x0$) {
          return;
        }
        return this.login(target).then(function(){
          return setTimeout(function(){
            return this$.enter(target);
          });
        });
      },
      onEnter: function(event){
        var x0$, target;
        x0$ = target = this.getTarget(event.target);
        if (!x0$) {
          return;
        }
        return this.enter(target);
      },
      enter: function(it){
        var this$ = this;
        Base.global.me = app.me = it.me;
        localStorage.lastAccountId = it.id;
        return Base.global.me.getInfo().then(function(){
          return app.go('home');
        });
      },
      login: function(it){
        var this$ = this;
        return this.vm.login(it).then(null, function(){
          return bootbox.alert('登录失败');
        });
      },
      getTarget: function(it){
        var id, target;
        id = this.$(it).closest('[aid]').attr('aid');
        if (!id) {
          return;
        }
        return target = this.vm.collection.get(id);
      }
    });
  });
}).call(this);
