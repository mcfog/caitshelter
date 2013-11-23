(function(){
  define(['view/base', 'backbone.joint', 'app', 'vm/meta', 'view/partial/deckeditor'], function(Base, Joint, app, MetaVM, DeckEditorView){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/my/rune',
      events: {
        'click .filter-star,.filter-race,.filter-level': 'onFilter',
        'click .available': 'onUpRune',
        'click .indeck': 'onUnRune'
      },
      initialize: function(){
        var x0$, resources, ref$, this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        this.setView('.deckeditor', this.editorView = new DeckEditorView({
          deck: function(){
            return app.me.deck;
          }
        }));
        this.sync('me', app.me);
        this.listenTo(this.editorView.deck, '$J:sync', function(){
          return this$.renderFields('', 'deck');
        });
        x0$ = resources = [];
        x0$.push(MetaVM.rune());
        x0$.push(app.me.getUserRunes());
        x0$.push(Joint.Deferred.listen(this, ['$J:render:full:done']));
        return (ref$ = Joint.Deferred).when.apply(ref$, resources).then(function(RUNE, Runes){
          this$.data.RUNE = RUNE;
          this$.Runes = Runes;
          return this$.redrawRunes();
        });
      },
      redrawRunes: function(){
        this.data.Runes = this.filterRunes();
        return this.renderFields('', 'Runes');
      },
      filterRunes: function(){
        var stars, races, levels, this$ = this;
        stars = this.$('.filter-star .active').map(function(){
          return this.getAttribute('key');
        });
        races = this.$('.filter-race .active').map(function(){
          return this.getAttribute('key');
        });
        levels = this.$('.filter-level .active').map(function(){
          return parseInt(this.getAttribute('key'));
        });
        function rankLevel(level){
          switch (false) {
          case level != 0:
            return 1;
          case !(level < 4):
            return 2;
          case level != 4:
            return 3;
          }
        }
        return _.chain(this.Runes).filter(function(it){
          return -1 != _.indexOf(stars, this$.data.RUNE[it.RuneId].Color);
        }).filter(function(it){
          return -1 != _.indexOf(races, this$.data.RUNE[it.RuneId].Property);
        }).filter(function(it){
          return -1 != _.indexOf(levels, rankLevel(it.Level));
        }).sortBy(function(it){
          var info;
          info = this$.data.RUNE[it.RuneId];
          return -info.Color * 100000 + info.Race * 100 - it.Level * 1000 + it.RuneId * 10;
        }).value();
      },
      onFilter: function(events){
        return _.defer(bind$(this, 'redrawRunes'));
      },
      onUpRune: function(event){
        var urid;
        if (!app.me.deck) {
          return;
        }
        urid = this.$(event.currentTarget).closest('[urid]').attr('urid');
        return app.me.deck.uprune(urid);
      },
      onUnRune: function(event){
        var urid;
        if (!app.me.deck) {
          return;
        }
        urid = this.$(event.currentTarget).closest('[urid]').attr('urid');
        return app.me.deck.unrune(urid);
      },
      serializeData: function(){
        var x0$, deck, urids, this$ = this;
        x0$ = Base.prototype.serializeData.apply(this, arguments);
        deck = app.me.deck;
        if (deck && x0$.Runes) {
          urids = deck.get('urids');
          x0$.Runes = _.map(x0$.Runes, function(it){
            var inDeck;
            inDeck = _.contains(urids, it.UserRuneId.toString());
            return import$({
              inDeck: inDeck
            }, it);
          });
        }
        return x0$;
      }
    });
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
