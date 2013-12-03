(function(){
  define(['view/base', 'app'], function(Base, app){
    return Base.extend({
      template: 'page/gou',
      events: {
        'click .btn-buy': 'onBuy'
      },
      initialize: function(){
        return Base.prototype.initialize.apply(this, arguments);
      },
      onBuy: function(event){
        var $target, times, this$ = this;
        if (this.data.buying) {
          return;
        }
        $target = this.$(event.currentTarget);
        times = parseInt($target.attr('time')) || 10;
        times = Math.min(100, times);
        this.data.buying = true;
        this.data.progress = undefined;
        render();
        app.me.emit('gou', times).then(function(it){
          this$.data.result = it;
          this$.data.buying = false;
          app.me.getInfo().then(function(){
            return this$.renderFields('me', 'info');
          });
          return render();
        }, function(){
          this$.data.buying = false;
          return render();
        }, function(progress){
          this$.data.progress = progress;
          return render();
        });
        function render(){
          return this$.renderFields('', 'buy');
        }
        return render;
      }
    });
  });
}).call(this);
