(function(){
  define(['view/base', 'app', 'lodash'], function(Base, app, _){
    return Base.extend({
      template: 'page/maze',
      events: {
        'click .btn-maze': 'onMaze'
      },
      initialize: function(){
        Base.prototype.initialize.apply(this, arguments);
        return this.fetchInfo();
      },
      fetchInfo: function(){
        var this$ = this;
        this.data.info = [];
        this.renderFields('', 'info');
        return _.each([2, 3, 4, 5, 6, 7, 8], function(MapStageId){
          return app.me.request("maze", "Show", {
            MapStageId: MapStageId
          }).then(function(it){
            var x0$;
            x0$ = this$.data.info[MapStageId] = it;
            x0$.status = 1 - x0$.Clear << 1 | x0$.FreeReset;
            x0$.id = MapStageId;
            return this$.renderFields('', 'info');
          });
        });
      },
      onMaze: function(event){
        var $target, layer, this$ = this;
        if (this.data.mazing) {
          return;
        }
        $target = this.$(event.currentTarget);
        layer = parseInt($target.attr('layer')) || 8;
        this.data.mazing = true;
        this.data.progress = [];
        this.data.result = null;
        render();
        app.me.emit('maze', layer).then(function(it){
          this$.data.result = it;
          return finish();
        }, function(it){
          var that;
          switch (false) {
          case !(that = it && it.content && it.content.message):
            alert(that);
            break;
          case it.Win !== 2:
            alert('自动打不过对手= =忘了换卡组了？');
            break;
          case !_.isString(it):
            alert(it);
            break;
          default:
            alert('failed');
          }
          return finish();
        }, function(it){
          console.log(it);
          this$.data.progress.concat(it);
          return render();
        });
        function finish(){
          this$.data.mazing = false;
          this$.fetchInfo();
          return render();
        }
        function render(){
          return this$.renderFields('', 'maze');
        }
        return render;
      }
    });
  });
}).call(this);
