(function(){
  define(['view/base', 'app', 'bootbox'], function(Base, app, bootbox){
    return Base.extend({
      template: 'page/usersearch',
      events: {
        'submit form[name=search]': 'onSubmit',
        'click .btn-inspect': 'onInspect'
      },
      onSubmit: function(event){
        var NickName, this$ = this;
        NickName = this.$('input[name=nickname]').val();
        app.me.request('friend', 'Search', {
          NickName: NickName
        }).then(function(arg$){
          this$.data.Friends = arg$.Friends;
          return this$.renderFields('', 'Friends');
        });
        return event.preventDefault();
      },
      onInspect: function(event){
        var uid, this$ = this;
        uid = this.$(event.currentTarget).closest('[uid]').attr('uid');
        return Base.fetchGlobal().then(function(){
          return app.me.request('arena', 'FreeFight', {
            isManual: 0,
            NoChip: 1,
            Competitor: uid
          });
        }).then(function(it){
          this$.data.deck = it.DefendPlayer;
          console.log(it);
          this$.renderFields('', 'deck');
          return this$.once('$J:render:part:done', function(){
            return bootbox.dialog({
              message: this$.$('.deck'),
              title: '卡组查看'
            });
          });
        });
      }
    });
  });
}).call(this);
