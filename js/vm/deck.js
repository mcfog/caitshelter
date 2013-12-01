(function(){
  define(['backbone.joint', 'app', 'vm/meta'], function(Joint, app, MetaVM){
    var DeckVM;
    return DeckVM = Joint.ViewModel.extend({
      connect: function(){
        var x0$, this$ = this;
        x0$ = this.collection = app.me.getDeckCollection();
        this.listenTo(x0$, 'sync remove', function(){
          return this$.sync();
        });
        Joint._.each(['create', 'fetch', 'findWhere'], function(fn){
          return this$[fn] = function(){
            var ref$;
            return (ref$ = this$.collection)[fn].apply(ref$, arguments);
          };
        });
        return setTimeout(function(){
          return this$.collection.fetch();
        });
      },
      serializeData: function(){
        var ref$, this$ = this;
        return (ref$ = Joint.Deferred).when.apply(ref$, this.collection.map(bind$(DeckVM, 'serializeDeck'))).then(function(){
          return Joint._.toArray(arguments);
        });
      }
    }, {
      serializeDeck: function(deck){
        var this$ = this;
        return Joint.Deferred.when(app.me.getUserCards(), app.me.getUserRunes(), MetaVM.card()).then(function(cards, runes, CARD){
          var _, x0$;
          _ = Joint._;
          function findCard(id){
            return _.find(cards, function(it){
              return it.UserCardId == id;
            });
          }
          function findRune(id){
            return _.find(runes, function(it){
              return it.UserRuneId == id;
            });
          }
          x0$ = deck.toJSON();
          x0$.Cards = _.map(deck.get('ucids'), findCard);
          x0$.Runes = _.map(deck.get('urids'), findRune);
          x0$.cost = _.reduce(x0$.Cards, function(sum, card){
            if (card.Evolution && card.Evolution > 0) {
              return sum + parseInt(CARD[card.CardId].EvoCost);
            } else {
              return sum + parseInt(CARD[card.CardId].Cost);
            }
          }, 0);
          return x0$;
        });
      }
    });
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
