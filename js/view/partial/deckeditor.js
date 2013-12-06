(function(){
  define(['view/base', 'vm/deck', 'backbone.joint', 'view/mixin/localdeck_toolbar', 'app'], function(Base, DeckVM, Joint, Toolbar, app){
    return Base.extend({
      template: 'partial/deckeditor',
      events: {
        'click .card': 'onClickCard',
        'click .btn-uncard': 'onUnCard',
        'click .rune': 'onClickRune',
        'click .btn-unrune': 'onUnRune',
        'click .btn-endedit': 'onEndEdit'
      },
      initialize: function(options){
        this.options = options;
        Base.prototype.initialize.apply(this, arguments);
        this.sync('deck', this.deck = new DeckVM());
        return this.mixin(Toolbar, {
          deck: this.deck
        });
      },
      onClickCard: function(event){
        var $card;
        $card = this.$(event.currentTarget);
        this.$('.btn-uncard').remove();
        return Joint.$(document.createElement('div')).addClass('btn-uncard btn btn-danger').css({
          position: 'absolute',
          top: 0,
          left: 0
        }).text('卸下').appendTo($card);
      },
      onUnCard: function(event){
        var ucid, deck;
        ucid = this.$(event.currentTarget).closest('[ucid]').attr('ucid');
        deck = this.getDeck();
        return deck.uncard(ucid);
      },
      onClickRune: function(event){
        var $rune;
        $rune = this.$(event.currentTarget);
        this.$('.btn-unrune').remove();
        return Joint.$(document.createElement('div')).addClass('btn-unrune btn btn-danger').css({
          position: 'absolute',
          top: 0,
          left: 0
        }).text('卸下').appendTo($rune);
      },
      onUnRune: function(event){
        var urid, deck;
        urid = this.$(event.currentTarget).closest('[urid]').attr('urid');
        deck = this.getDeck();
        return deck.unrune(urid);
      },
      onEndEdit: function(event){
        delete app.me.deck;
        return this.renderElement();
      },
      serializeData: function(){
        var data, deck, x0$;
        data = Base.prototype.serializeData.apply(this, arguments);
        deck = this.getDeck();
        if (!deck) {
          x0$ = data;
          delete x0$.deck;
          return x0$;
        } else {
          return DeckVM.serializeDeck(deck).then(function(it){
            var x1$;
            x1$ = data;
            x1$.deck = it;
            return x1$;
          });
        }
      },
      getDeck: function(){
        return Joint._.result(this.options, 'deck');
      }
    });
  });
}).call(this);
