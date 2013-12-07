(function(){
  define(['view/base', 'app', 'backbone.joint', 'bootbox,', 'model/option'], function(Base, app, Joint, bootbox, Option){
    var GvgView;
    return GvgView = Base.extend({
      template: 'page/emufight',
      events: {
        'click .btn-fight': 'onFight',
        'change .player1 :input, player2 :input': 'onChange',
        'input .player1 :input, player2 :input': 'onChange'
      },
      initialize: function(){
        var this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        return this.once('$J:render:full:done', function(){
          var i$, ref$, len$, p, player, ref1$, lv, deck, results$ = [];
          for (i$ = 0, len$ = (ref$ = [1, 2]).length; i$ < len$; ++i$) {
            p = ref$[i$];
            player = app.me["emu" + p];
            if (!player) {
              continue;
            }
            ref1$ = player.split(':'), lv = ref1$[0], deck = ref1$[1];
            this$.$(".player" + p + " [name=level]").val(lv);
            results$.push(this$.$(".player" + p + " [name=deck]").val(deck));
          }
          return results$;
        });
      },
      onChange: function(event){
        var i$, ref$, len$, p, lv, deck, results$ = [];
        for (i$ = 0, len$ = (ref$ = [1, 2]).length; i$ < len$; ++i$) {
          p = ref$[i$];
          lv = this.$(".player" + p + " [name=level]").val();
          deck = this.$(".player" + p + " [name=deck]").val();
          results$.push(app.me["emu" + p] = [lv, deck].join(':'));
        }
        return results$;
      },
      onFight: function(event){
        var ref$, hlv1, deck1, ref1$, hlv2, deck2, data, $form, this$ = this;
        ref$ = app.me.emu1.split(':'), hlv1 = ref$[0], deck1 = ref$[1];
        ref1$ = app.me.emu2.split(':'), hlv2 = ref1$[0], deck2 = ref1$[1];
        data = {
          hlv1: hlv1,
          deck1: deck1,
          hlv2: hlv2,
          deck2: deck2,
          count: 1000,
          firstAttack: -1
        };
        $form = Joint.$('<form>').attr({
          method: 'POST',
          action: Option.get('server') + "/mkhxcc/PlayAutoMassiveGame",
          target: '_blank'
        });
        Joint._.each(data, function(value, name){
          return $form.append(Joint.$('<input>', {
            name: name,
            value: value,
            type: 'hidden'
          }));
        });
        return $form.appendTo(document.body).submit().remove();
      }
    });
  });
}).call(this);
