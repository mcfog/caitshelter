(function(){
  define(['view/base', 'app'], function(Base, app){
    return Base.extend({
      template: 'page/fightrank',
      events: {
        'click .btn-fight': 'onFight'
      },
      onFight: function(event){
        var $target, times, this$ = this;
        if (this.data.fighting) {
          return;
        }
        $target = this.$(event.currentTarget);
        times = parseInt($target.attr('time')) || 10;
        times = Math.min(30, times);
        this.data.fighting = true;
        this.data.progress = undefined;
        render();
        app.me.fightRank(times).then(function(it){
          this$.data.result = it;
          this$.data.fighting = false;
          return render();
        }, function(){
          console.log(arguments);
          alert('failed');
          this$.data.fighting = false;
          return render();
        }, function(progress){
          this$.data.progress = progress;
          return render();
        });
        function render(){
          return this$.renderFields('', 'fight');
        }
        return render;
      }
    });
  });
}).call(this);
