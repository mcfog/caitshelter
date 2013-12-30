(function(){
  define(['view/base', 'app', 'lodash'], function(Base, app, _){
    return Base.extend({
      template: 'page/map',
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.getInfo();
      },
      getInfo: function(){
        var this$ = this;
        return app.me.request('mapstage', 'GetUserMapStages').then(function(maps){
          this$.data.stages = _.chain(maps).groupBy('MapStageId').map(function(maps, stage){
            return {
              maps: maps,
              stage: stage
            };
          }).value().reverse();
          return this$.flush();
        });
      },
      flush: function(){
        this.renderFields('', 'stages');
      }
    });
  });
}).call(this);
