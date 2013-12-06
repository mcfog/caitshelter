(function(){
  define(['view/base', 'app', 'bootbox', 'vm/deck'], function(Base, app, bootbox, DeckVM){
    return Base.extend({
      template: 'page/usersearch',
      events: {
        'submit form[name=search]': 'onSubmit',
        'click .btn-inspect': 'onInspect',
        'click .btn-emu': 'onEmu'
      },
      onSubmit: function(event){
        var NickName, this$ = this;
        NickName = this.$('input[name=nickname]').val();
        app.me.request('friend', 'Search', {
          NickName: NickName
        }).then(function(arg$){
          this$.data.Friends = arg$.Friends;
          return this$.renderFields('', 'Friends');
        });
        return event.preventDefault();
      },
      onInspect: function(event){
        var uid, this$ = this;
        uid = this.$(event.currentTarget).closest('[uid]').attr('uid');
        return Base.fetchGlobal().then(function(){
          return app.me.request('arena', 'FreeFight', {
            isManual: 0,
            NoChip: 1,
            Competitor: uid
          });
        }).then(function(it){
          this$.data.deck = it.DefendPlayer;
          return this$.renderFields('', 'deck').then(function(){
            return bootbox.dialog({
              message: this$.$('.deck'),
              title: '卡组查看'
            });
          });
        });
      },
      onEmu: function(event){
        var p, uid, store, this$ = this;
        p = parseInt(this.$(event.currentTarget).attr('p'));
        uid = this.$(event.currentTarget).closest('[uid]').attr('uid');
        store = {};
        return app.me.request('arena', 'FreeFight', {
          isManual: 0,
          NoChip: 1,
          Competitor: uid
        }).then(function(it){
          store.deck = it.DefendPlayer;
          return DeckVM.dumpPlayerDeck(store.deck);
        }).then(function(it){
          return this$.setEmuPlayer(p, store.deck.Level, it);
        });
      }
    });
  });
}).call(this);
