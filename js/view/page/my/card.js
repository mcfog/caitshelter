(function(){
  define(['view/base', 'backbone.joint', 'app', 'vm/meta', 'view/partial/deckeditor'], function(Base, Joint, app, MetaVM, DeckEditorView){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/my/card',
      events: {
        'click .filter-star,.filter-race,.filter-level': 'onFilter',
        'click .available': 'onUpCard',
        'click .indeck': 'onUnCard'
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
        x0$.push(MetaVM.card());
        x0$.push(MetaVM.skill());
        x0$.push(app.me.getUserCards());
        x0$.push(Joint.Deferred.listen(this, ['$J:render:full:done']));
        return (ref$ = Joint.Deferred).when.apply(ref$, resources).then(function(CARD, SKILL, Cards){
          this$.data.CARD = CARD;
          this$.data.SKILL = SKILL;
          this$.Cards = Cards;
          return this$.redrawCards();
        });
      },
      renderPromise: function(){
        return Joint.Deferred.listen(this, ['$J:render:part:done']);
      },
      redrawCards: function(){
        this.data.Cards = this.filterCards();
        return this.renderFields('', 'Cards');
      },
      filterCards: function(){
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
          case !(level < 5):
            return 1;
          case !(level < 10):
            return 2;
          case level != 10:
            return 3;
          case !(level < 15):
            return 4;
          case level != 15:
            return 5;
          }
        }
        return _(this.Cards).filter(function(it){
          return -1 != _.indexOf(stars, this$.data.CARD[it.CardId].Color);
        }).filter(function(it){
          return -1 != _.indexOf(races, this$.data.CARD[it.CardId].Race);
        }).filter(function(it){
          return -1 != _.indexOf(levels, rankLevel(it.Level));
        }).sortBy(function(it){
          var info;
          info = this$.data.CARD[it.CardId];
          return -info.Color * 100000 + info.Race * 100 - it.Level * 1000 + it.CardId * 10;
        }).value();
      },
      onFilter: function(event){
        return _.defer(bind$(this, 'redrawCards'));
      },
      onUpCard: function(event){
        var ucid;
        if (!app.me.deck) {
          return;
        }
        ucid = this.$(event.currentTarget).closest('[ucid]').attr('ucid');
        return app.me.deck.upcard(ucid);
      },
      onUnCard: function(event){
        var ucid;
        if (!app.me.deck) {
          return;
        }
        ucid = this.$(event.currentTarget).closest('[ucid]').attr('ucid');
        return app.me.deck.uncard(ucid);
      },
      serializeData: function(){
        var x0$, deck, ucids, this$ = this;
        x0$ = Base.prototype.serializeData.apply(this, arguments);
        deck = app.me.deck;
        if (deck && x0$.Cards) {
          ucids = deck.get('ucids');
          x0$.Cards = _.map(x0$.Cards, function(it){
            var inDeck;
            inDeck = _.contains(ucids, it.UserCardId.toString());
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
