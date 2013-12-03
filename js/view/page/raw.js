(function(){
  define(['view/base', 'app', 'backbone.joint', 'bootbox'], function(Base, app, Joint, bootbox){
    return Base.extend({
      template: 'page/raw',
      events: {
        'click .btn-go': 'onGo'
      },
      initialize: function(){
        return Base.prototype.initialize.apply(this, arguments);
      }
    });
  });
}).call(this);
