(function(){
  define(['view/base', 'app', 'bootbox'], function(Base, app, bootbox){
    return Base.extend({
      template: 'page/fightrank',
      events: {
        'click .btn-fight': 'onFight',
        'click .btn-attack': 'onAttack'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        this.data.competitor = {};
        return this.getRankCompetitors();
      },
      getRankCompetitors: function(){
        var this$ = this;
        return app.me.request('arena', 'GetRankCompetitors').then(function(it){
          this$.data.competitor = it;
          return this$.renderFields('', 'competitor');
        });
      },
      onAttack: function(event){
        var CompetitorRank, this$ = this;
        if (this.data.fighting) {
          return;
        }
        CompetitorRank = parseInt(this.$(event.currentTarget).attr('rank'));
        return app.me.request('arena', 'RankFight', {
          CompetitorRank: CompetitorRank
        }).then(function(it){
          this$.getRankCompetitors();
          if (it.Win === 1) {
            return bootbox.alert("胜利");
          } else {
            return bootbox.alert("失败");
          }
        }, function(it){
          var ref$;
          return bootbox.alert(((ref$ = it.content) != null ? ref$.message : void 8) || '连接失败');
        });
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
