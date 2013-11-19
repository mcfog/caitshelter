(function(){
  define(['collection/base', 'model/account'], function(Base, AccModel){
    return Base.extend({
      name: 'account',
      model: AccModel
    });
  });
}).call(this);
