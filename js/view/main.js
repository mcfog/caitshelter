(function(){
  define(['view/base', 'app'], function(Base, app){
    return Base.extend({
      template: 'main',
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        this.on('loadin', bind$(this, 'loadin'));
        this.on('loadout', bind$(this, 'loadout'));
        return this._load = 0;
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
      },
      loadin: function(){
        var this$ = this;
        this._load++;
        return this._load_tout = setTimeout(function(){
          return this$.$('#loading').stop(true, true).fadeIn();
        }, 300);
      },
      loadout: function(){
        this._load--;
        if (this._load) {
          return;
        }
        clearTimeout(this._load_tout);
        return this.$('#loading').stop(true, true).fadeOut('fast');
      }
    });
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
