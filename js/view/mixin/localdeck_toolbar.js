(function(){
  define(['view/base', 'backbone.joint', 'app', 'bootbox', 'vm/deck'], function(Base, Joint, app, bootbox, DeckVM){
    function bprompt(title, value, callback){
      return bootbox.prompt({
        title: title,
        value: value,
        callback: callback
      });
    }
    return Base.extend({
      events: {
        'click .ldeck .btn-set': 'onSet',
        'click .ldeck .btn-delete': 'onDelete',
        'click .ldeck .btn-rename': 'onRename',
        'click .ldeck .btn-dump': 'onDump',
        'click .ldeck .btn-emu': 'onEmu'
      },
      initialize: function(arg$){
        this.deck = arg$.deck;
      },
      onEmu: function(event){
        var p, target, this$ = this;
        p = parseInt(this.$(event.currentTarget).attr('p'));
        if (Joint._.isNaN(p)) {
          return;
        }
        target = this._target(event);
        if (!target) {
          return;
        }
        return DeckVM.myDeckToPlayer(target).then(function(it){
          return DeckVM.dumpPlayerDeck(it);
        }).then(function(it){
          return this$.setEmuPlayer(p, app.me.info.Level, it);
        });
      },
      onDump: function(event){
        var target, this$ = this;
        target = this._target(event);
        if (!target) {
          return;
        }
        return DeckVM.myDeckToPlayer(target).then(function(it){
          return DeckVM.dumpPlayerDeck(it);
        }).then(function(it){
          return bootbox.alert(it);
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
        app.main.loadin();
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
            app.main.loadout();
            return bootbox.alert('设置成功');
          }, function(it){
            var ref$;
            app.main.loadout();
            return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
          });
        });
      },
      onRename: function(event){
        var target, this$ = this;
        target = this._target(event);
        if (!target) {
          return;
        }
        return bprompt('卡组名称？', target.get('name'), function(name){
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
      _target: function(event){
        var id;
        id = this.$(event.currentTarget).closest('[did]').attr('did');
        return this.deck.findWhere({
          id: id
        });
      }
    });
  });
}).call(this);
