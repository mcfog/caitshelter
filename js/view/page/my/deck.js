(function(){
  define(['view/base', 'backbone.joint', 'app'], function(Base, Joint, app){
    return Base.extend({
      template: 'page/my/deck',
      events: {
        'click .btn-set-default': 'onSetDefault'
      },
      initialize: function(){
        var x0$, resources, ref$, this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        x0$ = resources = [];
        x0$.push(app.me.request('card', 'GetCardGroup'));
        x0$.push(Base.fetchGlobal());
        return (ref$ = Joint.Deferred).when.apply(ref$, resources).then(function(arg$){
          this$.data.Groups = arg$.Groups;
          return this$.renderFields('', 'Groups');
        });
      },
      onSetDefault: function(event){
        var GroupId, this$ = this;
        GroupId = parseInt(this.$(event.currentTarget).attr('gid'));
        return app.me.request('card', 'SetDefalutGroup', {
          GroupId: GroupId
        }).then(function(){
          app.me.info.DefaultGroupId = GroupId;
          return this$.render();
        });
      }
    });
  });
}).call(this);
