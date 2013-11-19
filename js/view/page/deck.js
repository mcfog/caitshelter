(function(){
  define(['view/base', 'backbone.joint', 'vm/me', 'vm/meta'], function(Base, Joint, me, MetaVM){
    return Base.extend({
      template: 'page/deck',
      partials: ['card', 'rune', 'deck', 'deckNav'],
      events: {
        'click .btn-set-default': 'onSetDefault'
      },
      initialize: function(){
        var x0$, resources, ref$, this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        this.sync('me', me);
        x0$ = resources = [];
        x0$.push(MetaVM.card());
        x0$.push(MetaVM.skill());
        x0$.push(MetaVM.rune());
        x0$.push(me.request('card', 'GetCardGroup'));
        return (ref$ = Joint.Deferred).when.apply(ref$, resources).then(function(CARD, SKILL, RUNE, arg$){
          this$.data.CARD = CARD;
          this$.data.SKILL = SKILL;
          this$.data.RUNE = RUNE;
          this$.data.Groups = arg$.Groups;
          return this$.renderFields('', 'Groups');
        });
      },
      onSetDefault: function(event){
        var GroupId, this$ = this;
        GroupId = parseInt(this.$(event.currentTarget).attr('gid'));
        return me.request('card', 'SetDefalutGroup', {
          GroupId: GroupId
        }).then(function(){
          me.info.DefaultGroupId = GroupId;
          return this$.render();
        });
      }
    });
  });
}).call(this);
