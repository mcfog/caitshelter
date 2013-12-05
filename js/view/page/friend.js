(function(){
  define(['view/base', 'app', 'bootbox', 'backbone.joint'], function(Base, app, bootbox, Joint){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/friend',
      events: {
        'click .btn-show': 'onShow',
        'click .btn-give': 'onGive',
        'click .btn-take': 'onTake'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.getFriends();
      },
      onShow: function(event){
        this.$(event.currentTarget).addClass('fade');
        return this.getFriends();
      },
      onGive: function(event){
        var uid;
        if (!(uid = this._uid(event))) {
          return;
        }
        return app.me.request('fenergy', 'SendFEnergy', {
          Fid: uid
        });
      },
      onTake: function(event){
        var uid;
        if (!(uid = this._uid(event))) {
          return;
        }
        return app.me.request('fenergy', 'GetFEnergy', {
          Fid: uid
        });
      },
      _uid: function(event){
        var $t;
        $t = this.$(event.currentTarget).addClass('fade');
        return parseInt($t.closest('[uid]').attr('uid'));
      },
      getFriends: function(){
        var this$ = this;
        return app.me.request("friend", "GetFriends").then(function(it){
          return this$.updateInfo(it);
        });
      },
      updateInfo: function(info){
        this.data.info = info;
        return this.renderFields('', 'info');
      }
    });
  });
}).call(this);
