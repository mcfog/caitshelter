(function(){
  define(['view/base', 'backbone.joint', 'bootbox', 'vm/deck', 'app'], function(Base, Joint, bootbox, DeckVM, app){
    var LDView;
    LDView = Base.extend({
      template: 'page/my/localdeck',
      events: {
        'click .btn-create': 'onCreate',
        'click .btn-import': 'onImport',
        'click .btn-set': 'onSet',
        'click .btn-goto': 'onGoto',
        'click .btn-delete': 'onDelete',
        'click .btn-rename': 'onRename',
        'click .btn-editcard': 'onEditCard',
        'click .btn-editrune': 'onEditRune'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.sync('_deck', this.deck = new DeckVM());
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
      onSet: function(event){
        var gnum, target, this$ = this;
        gnum = parseInt(this.$(event.currentTarget).attr('group')) - 1;
        if (Joint._.isNaN(gnum)) {
          return;
        }
        target = this._target(event);
        if (!target) {
          return;
        }
        this.trigger('loadin');
        return app.me.request('card', 'GetCardGroup').then(function(arg$){
          var Groups, g, GroupId, Cards, ref$, Runes, ref1$;
          Groups = arg$.Groups;
          g = Groups[gnum];
          GroupId = g.GroupId;
          Cards = (ref$ = target.get('ucids')) != null ? ref$.join('_') : void 8;
          Runes = (ref1$ = target.get('urids')) != null ? ref1$.join('_') : void 8;
          return app.me.request('card', 'SetCardGroup', {
            Cards: Cards,
            Runes: Runes,
            GroupId: GroupId
          }).then(function(){
            this$.trigger('loadout');
            return bootbox.alert('设置成功');
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
      onRename: function(event){
        var target, this$ = this;
        target = this._target(event);
        if (!target) {
          return;
        }
        return prompt('卡组名称？', target.get('name'), function(name){
          if (!name) {
            return;
          }
          if (this$.deck.findWhere({
            name: name
          })) {
            return bootbox.alert('名称不能重复~');
          }
          target.set('name', name);
          return target.save();
        });
      },
      onDelete: function(event){
        var target, this$ = this;
        target = this._target(event);
        if (!target) {
          return;
        }
        return bootbox.confirm("是否要删除卡组【" + target.get('name') + "】?", function(it){
          var ref$, ref1$;
          if (!it) {
            return;
          }
          target.destroy();
          if (target === app.me.deck) {
            return ref1$ = (ref$ = app.me).deck, delete ref$.deck, ref1$;
          }
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
