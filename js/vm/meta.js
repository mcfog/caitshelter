(function(){
  define(['backbone.joint', 'lodash'], function(Joint, _){
    var MetaVM;
    return MetaVM = Joint.ViewModel.extend({}, {
      card: function(){
        var that;
        if (that = this._card) {
          return that;
        }
        return this._card = Joint.$.getJSON('/meta/allcard.json').then(function(it){
          return _.indexBy(it.Cards, 'CardId');
        });
      },
      skill: function(){
        var that;
        if (that = this._skill) {
          return that;
        }
        return this._skill = Joint.$.getJSON('/meta/allskill.json').then(function(it){
          return _.indexBy(it.Skills, 'SkillId');
        });
      },
      rune: function(){
        var that;
        if (that = this._rune) {
          return that;
        }
        return this._rune = Joint.$.getJSON('/meta/allrune.json').then(function(it){
          return _.indexBy(it.Runes, 'RuneId');
        });
      }
    });
  });
}).call(this);
