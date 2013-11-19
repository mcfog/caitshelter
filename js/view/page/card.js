(function(){
  define(['view/base', 'backbone.joint', 'vm/me', 'vm/meta'], function(Base, Joint, me, MetaVM){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/card',
      partials: ['card', 'cardFilter', 'deckNav'],
      events: {
        'click .filter-star,.filter-race,.filter-level': 'onFilter'
      },
      initialize: function(){
        var x0$, resources, ref$, this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        this.sync('me', me);
        x0$ = resources = [];
        x0$.push(MetaVM.card());
        x0$.push(MetaVM.skill());
        x0$.push(me.request('card', 'GetUserCards'));
        return (ref$ = Joint.Deferred).when.apply(ref$, resources).then(function(CARD, SKILL, arg$){
          this$.data.CARD = CARD;
          this$.data.SKILL = SKILL;
          this$.Cards = arg$.Cards;
          return this$.redrawCards();
        });
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
      onFilter: function(events){
        return _.defer(bind$(this, 'redrawCards'));
      }
    });
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
