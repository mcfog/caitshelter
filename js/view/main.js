(function(){
  define(['view/base', 'app'], function(Base, app){
    return Base.extend({
      template: 'main',
      initialize: function(){
        return Base.prototype.initialize.apply(this, arguments);
      },
      highlightHash: function(hash){
        var view;
        view = this;
        return this.$('.pages a').each(function(){
          var $a, re;
          $a = $(this);
          re = new RegExp($a.attr('highlight') || "^" + $a.attr('href') + "$");
          $a.closest('li').toggleClass('active', hash.match(re) || false);
          return view.$('li.active').parents('li').addClass('active');
        });
      }
    });
  });
}).call(this);
