(function(){
  define(['dust-runtime', 'dust-helpers'], function(dust){
    var tap, cardImgTypes, runeImgTypes, ref$;
    tap = bind$(dust.helpers, 'tap');
    cardImgTypes = {
      photo: '110_110',
      min: '110_170',
      middle: '225_322',
      max: '370_570'
    };
    runeImgTypes = {
      s_bg: '110_110',
      s: '110_110_no',
      l: '220_220'
    };
    return ref$ = dust.helpers, ref$.shenglv = function(chunk, context, bodies, params){
      var win, lose;
      function tap(it){
        return dust.helpers.tap(it, chunk, context);
      }
      win = parseInt(tap(params.win));
      lose = parseInt(tap(params.lose));
      return chunk.write((100 * win / (win + lose)).toFixed(2));
    }, ref$.cardImg = function(chunk, context, bodies, params){
      var id, type;
      function tap(it){
        return dust.helpers.tap(it, chunk, context);
      }
      id = tap(params.id);
      type = tap(params.type);
      if (!type || !cardImgTypes[type]) {
        type = 'photo';
      }
      if (!(id > 0)) {
        id = 8006;
      }
      return chunk.write("http://d.muhecdn.com/mkhx/public/swf/card/" + cardImgTypes[type] + "/img_" + type + "Card_" + id + ".jpg");
    }, ref$.runeImg = function(chunk, context, bodies, params){
      var id, type;
      function tap(it){
        return dust.helpers.tap(it, chunk, context);
      }
      id = tap(params.id);
      type = tap(params.type);
      if (!type || !runeImgTypes[type]) {
        type = 's';
      }
      return chunk.write("http://d.muhecdn.com/mkhx/public/swf/rune/" + runeImgTypes[type] + "/rune_" + id + ".png");
    }, ref$.partial = function(chunk, context, bodies, params){
      var partial, partialTagContext, param, partialTagData, partialCtx, template, contextIndex, overrideContext, partialOverrideContext;
      partial = {};
      if (params) {
        partialTagContext = params.key || 'partial';
        for (param in params) {
          if (param !== 'key') {
            partial[param] = dust.helpers.tap(params[param], chunk, context);
          }
        }
      }
      partialTagData = context.get(partialTagContext);
      if (partialTagData) {
        import$(partial, partialTagData);
      }
      partial.isPartial = true;
      partialCtx = dust.makeBase(context.global).push(partial);
      if (params && params.template) {
        template = params.template;
        if (template.indexOf(':' === -1)) {
          return chunk.partial(template, partialCtx);
        } else {
          contextIndex = template.indexOf(':');
          overrideContext = template.substring(parseInt(contextIndex + 1, 10));
          template = template.substring(0, parseInt(contextIndex, 10));
          partialOverrideContext = context.get(overrideContext);
          if (partialOverrideContext) {
            import$(partial, partialOverrideContext);
          }
          return chunk.partial(template, partialCtx);
        }
      } else {
        return bodies.block(chunk, partialCtx);
      }
    }, ref$.param = function(chunk, context, bodies, params){
      var key, defaultVal, pKeyValue;
      if (context.global && context.get('isPartial')) {
        if (params) {
          key = params.name;
          defaultVal = params['default'];
          pKeyValue = context.global[key];
          if (key && typeof pKeyValue === 'undefined' && typeof defaultVal !== 'undefined') {
            context.global[key] = defaultVal;
          }
        }
      }
      return chunk;
    }, ref$;
  });
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
