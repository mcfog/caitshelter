(function(){
  define(['view/base', 'backbone.joint', 'bootbox', 'vm/deck', 'app', 'view/mixin/localdeck_toolbar'], function(Base, Joint, bootbox, DeckVM, app, Toolbar){
    var LDView;
    LDView = Base.extend({
      template: 'page/my/localdeck',
      events: {
        'click .btn-create': 'onCreate',
        'click .btn-import': 'onImport',
        'click .btn-goto': 'onGoto',
        'click .btn-editcard': 'onEditCard',
        'click .btn-editrune': 'onEditRune'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        this.sync('_deck', this.deck = new DeckVM());
        return this.mixin(Toolbar, {
          deck: this.deck
        });
      },
      onImport: function(event){
        var gnum, this$ = this;
        gnum = parseInt(this.$(event.currentTarget).attr('group')) - 1;
        if (Joint._.isNaN(gnum)) {
          return;
        }
        return prompt('卡组名称？', "卡组" + (gnum + 1) + "@" + (new Date).toLocaleDateString(), function(name){
          if (!name) {
            return;
          }
          if (this$.deck.findWhere({
            name: name
          })) {
            return bootbox.alert('名称不能重复~');
          }
          this$.trigger('loadin');
          return app.me.request('card', 'GetCardGroup').then(function(arg$){
            var Groups, g;
            Groups = arg$.Groups;
            this$.trigger('loadout');
            g = Groups[gnum];
            return this$.deck.create({
              name: name,
              ucids: g.UserCardIds.split('_'),
              urids: g.UserRuneIds.split('_')
            });
          }, function(it){
            var ref$;
            this$.trigger('loadout');
            return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
          });
        });
      },
      onCreate: function(event){
        var this$ = this;
        return prompt('卡组名称？', '新卡组', function(name){
          if (!name) {
            return;
          }
          if (this$.deck.findWhere({
            name: name
          })) {
            return bootbox.alert('名称不能重复~');
          }
          return this$.deck.create({
            name: name
          });
        });
      },
      onEditCard: function(event){
        var target;
        target = this._target(event);
        if (!target) {
          return;
        }
        app.me.deck = target;
        return app.go('my', 'card');
      },
      onEditRune: function(event){
        var target;
        target = this._target(event);
        if (!target) {
          return;
        }
        app.me.deck = target;
        return app.go('my', 'rune');
      },
      onGoto: function(event){
        var target, ref$;
        target = this._target(event);
        if (!target) {
          return;
        }
        return (ref$ = this.$("section[did=\"" + target.get('id') + "\"]")[0]) != null ? typeof ref$.scrollIntoView == 'function' ? ref$.scrollIntoView() : void 8 : void 8;
      },
      _target: function(event){
        var id;
        id = this.$(event.currentTarget).closest('[did]').attr('did');
        return this.deck.findWhere({
          id: id
        });
      },
      serializeData: function(){
        var this$ = this;
        return this.deck.serializeData().then(function(it){
          var x0$;
          x0$ = Base.prototype.serializeData.apply(this$, arguments);
          x0$.deck = it;
          return x0$;
        });
      }
    });
    function prompt(title, value, callback){
      return bootbox.prompt({
        title: title,
        value: value,
        callback: callback
      });
    }
    return LDView;
  });
}).call(this);
