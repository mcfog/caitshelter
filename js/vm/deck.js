(function(){
  define(['backbone.joint', 'app', 'vm/meta'], function(Joint, app, MetaVM){
    var DeckVM;
    return DeckVM = Joint.ViewModel.extend({
      connect: function(){
        var x0$, this$ = this;
        x0$ = this.collection = app.me.getDeckCollection();
        this.listenTo(x0$, 'sync remove', function(){
          return setTimeout(function(){
            return this$.sync();
          });
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
      myDeckToPlayer: function(deck){
        var this$ = this;
        return Joint.Deferred.when(app.me.getUserCards(), app.me.getUserRunes()).then(function(UserCards, UserRunes){
          var Runes, Cards;
          Runes = _.compact(_.map(deck.get('urids'), function(urid){
            return _.findWhere(UserRunes, function(it){
              return it.UserRuneId == urid;
            });
          }));
          Cards = _.compact(_.map(deck.get('ucids'), function(ucid){
            return _.findWhere(UserCards, function(it){
              return it.UserCardId == ucid;
            });
          }));
          return {
            Runes: Runes,
            Cards: Cards
          };
        });
      },
      dumpPlayerDeck: function(arg$){
        var Runes, Cards, this$ = this;
        Runes = arg$.Runes, Cards = arg$.Cards;
        return Joint.Deferred.when(MetaVM.card(), MetaVM.rune(), MetaVM.skill()).then(function(CARD, RUNE, SKILL){
          var result;
          result = [];
          _.each(Runes, function(urune){
            var rune, level;
            rune = RUNE[parseInt(urune.RuneId)];
            if (!rune) {
              return;
            }
            level = urune.Level != 4 && "-" + urune.Level || '';
            return result.push(rune.RuneName + "" + level);
          });
          _.each(Cards, function(ucard){
            var card, skill, level;
            card = CARD[ucard.CardId];
            if (!card) {
              return;
            }
            skill = SKILL[ucard.SkillNew];
            skill = skill && "+" + skill.Name.replace(/[\[\]]/g, '') || '';
            level = (function(){
              switch (false) {
              case !(ucard.Evolution > 0 && ucard.Level == 15):
                return '';
              case !((!ucard.Evolution || ucard.Evolution == 0) && ucard.Level == 10):
                return '';
              default:
                return "-" + ucard.Level;
              }
            }());
            return result.push(card.CardName + "" + skill + level);
          });
          return result.join(',');
        });
      },
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
          x0$.Cards = _.compact(_.map(deck.get('ucids'), findCard));
          x0$.Runes = _.compact(_.map(deck.get('urids'), findRune));
          x0$.cost = _.reduce(x0$.Cards, function(sum, card){
            if ((card != null ? card.Evolution : void 8) > 0) {
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
