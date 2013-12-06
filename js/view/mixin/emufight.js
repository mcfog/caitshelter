(function(){
  define(['view/base', 'backbone.joint', 'app', 'bootbox', 'vm/deck'], function(Base, Joint, app, bootbox, DeckVM){
    return Base.extend({
      events: {
        'click .btn-emu-fight': 'onFight'
      },
      initialize: function(options){
        this.options = options;
      },
      onFight: function(event){
        var store, this$ = this;
        store = {};
        return Joint.Deferred.when(this.options.player1(event.currentTarget), this.options.player2(event.currentTarget)).then(function(p1, p2){
          store.p1 = p1;
          store.p2 = p2;
          return Joint.Deferred.when(DeckVM.dumpPlayerDeck(store.p1), DeckVM.dumpPlayerDeck(store.p2));
        }).then(function(deck1, deck2){
          return {
            hlv1: store.p1.Level,
            hlv2: store.p2.Level,
            deck1: deck1,
            deck2: deck2,
            count: 1000,
            firstAttck: -1
          };
        }).then(function(it){
          var $form;
          $form = Joint.$('<form>').attr({
            method: 'POST',
            action: 'http://www.mkhx.cc:8080/PlayAutoMassiveGame',
            target: '_blank'
          });
          Joint._.each(it, function(value, name){
            return $form.append(Joint.$('<input>', {
              name: name,
              value: value,
              type: 'hidden'
            }));
          });
          return $form.submit();
        });
      }
    });
  });
}).call(this);
