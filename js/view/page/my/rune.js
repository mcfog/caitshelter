(function(){
  define(['view/base', 'backbone.joint', 'app', 'vm/meta'], function(Base, Joint, app, MetaVM){
    var _;
    _ = Joint._;
    return Base.extend({
      template: 'page/my/rune',
      events: {
        'click .filter-star,.filter-race,.filter-level': 'onFilter'
      },
      initialize: function(){
        var x0$, resources, ref$, this$ = this;
        Base.prototype.initialize.apply(this, arguments);
        this.sync('me', app.me);
        x0$ = resources = [];
        x0$.push(MetaVM.rune());
        x0$.push(app.me.request('rune', 'GetUserRunes'));
        return (ref$ = Joint.Deferred).when.apply(ref$, resources).then(function(RUNE, arg$){
          this$.data.RUNE = RUNE;
          this$.Runes = arg$.Runes;
          return this$.redrawRunes();
        });
      },
      redrawRunes: function(){
        this.data.Runes = this.filterRunes();
        return this.renderFields('', 'Runes');
      },
      filterRunes: function(){
        var stars, races, levels, this$ = this;
        stars = this.$('.filter-star .active').map(function(){
          return this.getAttribute('key');
        });
        races = this.$('.filter-race .active').map(function(){
          return this.getAttribute('key');
        });
        levels = this.$('.filter-level .active').map(function(){
          return parseInt(this.getAttribute('key'));
        });
        function rankLevel(level){
          switch (false) {
          case level != 0:
            return 1;
          case !(level < 4):
            return 2;
          case level != 4:
            return 3;
          }
        }
        return _.chain(this.Runes).filter(function(it){
          return -1 != _.indexOf(stars, this$.data.RUNE[it.RuneId].Color);
        }).filter(function(it){
          return -1 != _.indexOf(races, this$.data.RUNE[it.RuneId].Property);
        }).filter(function(it){
          return -1 != _.indexOf(levels, rankLevel(it.Level));
        }).sortBy(function(it){
          var info;
          info = this$.data.RUNE[it.RuneId];
          return -info.Color * 100000 + info.Race * 100 - it.Level * 1000 + it.RuneId * 10;
        }).value();
      },
      onFilter: function(events){
        return _.defer(bind$(this, 'redrawRunes'));
      }
    });
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
