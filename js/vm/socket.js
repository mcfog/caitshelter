(function(){
  var slice$ = [].slice;
  define(['backbone.joint', 'socket.io', 'model/option'], function(Joint, io, Option){
    var SocketVM;
    SocketVM = Joint.ViewModel.extend({
      initialize: function(){
        var this$ = this;
        Joint.ViewModel.prototype.initialize.apply(this, arguments);
        this.socket = io.connect(Option.get('server'));
        return this.socket.on('progress', function(it){
          return this$.trigger('progress', it);
        });
      },
      emit: function(){
        var args, ref$, promise, resolver, ref1$, this$ = this;
        args = slice$.call(arguments);
        ref$ = Joint.Deferred.defer(), promise = ref$.promise, resolver = ref$.resolver;
        this.on('progress', notify);
        (ref1$ = this.socket).emit.apply(ref1$, slice$.call(args).concat([function(err){
          var result, that;
          result = slice$.call(arguments, 1);
          this$.off('progress', notify);
          if (that = err) {
            return resolver.reject(that);
          } else {
            return resolver.resolve.apply(resolver, result);
          }
        }]));
        function notify(it){
          return resolver.notify(it);
        }
        return promise;
      }
    });
    return new SocketVM;
  });
}).call(this);
