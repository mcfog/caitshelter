(function(){
  define(['model/option'], function(Option){
    function choose(host){
      return Option.set('server', host).then(function(){
        return location.href = "mkhx.html";
      });
    }
    return $(function(){
      $('img').each(function(){
        var x0$;
        x0$ = $(this);
        x0$.attr('src', x0$.attr('data-src') + '?' + Math.random());
        return x0$;
      });
      $('.choose').click(function(){
        return choose($(this).attr('server'));
      });
      return $('.promptChoose').click(function(){
        return choose(prompt('host'));
      });
    });
  });
}).call(this);
