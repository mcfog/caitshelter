(function(){
  var slice$ = [].slice;
  define(['view/main', 'backbone', 'lodash'], function(MainView, Backbone, _){
    var that, Router, x0$, app, i$, ref$, len$, name, x1$;
    if (!localStorage.hasOwnProperty('server')) {
      switch (that = location.host) {
      case 'caitshelter.ap01.aws.af.cm':
        localStorage.server = that;
        break;
      case 'cait.aws.af.cm':
        localStorage.server = that;
        break;
      default:
        return location.href = "index.html";
      }
    }
    Router = Backbone.Router.extend({
      go: function(){
        var frags;
        frags = slice$.call(arguments);
        return Backbone.history.navigate(frags.join(this.delimeter), {
          trigger: true
        });
      },
      replace: function(){
        var frags;
        frags = slice$.call(arguments);
        return Backbone.history.navigate(frags.join(this.delimeter), {
          trigger: true,
          replace: true
        });
      },
      delimeter: '/',
      routeN: function(route, callback){
        var re, argn, name, ref$;
        switch (false) {
        case !_.isRegExp(route):
          re = route;
          argn = route.argn, name = route.name;
          break;
        case !_.isString(route):
          ref$ = this._parse(route), re = ref$.re, argn = ref$.argn, name = ref$.name;
          break;
        case !_.isArray(route):
          re = route[0], argn = route[1], name = route[2];
          break;
        case !_.isObject(route):
          re = route.re, argn = route.argn, name = route.name;
        }
        return Backbone.Router.prototype.route.call(this, re, name, function(){
          var args;
          args = slice$.call(arguments);
          _.extend(args, _.object(argn, args));
          return callback(args);
        });
      },
      _parse: function(route){
        var name, argn, re;
        name = undefined;
        argn = [];
        re = route.replace(/([\(\)])/g, "\\$1").replace(/#(.*?)#/g, function(arg$, frag){
          var r;
          switch (false) {
          case frag !== '':
            return '#';
          case frag[0] !== '@':
            r = /^@(?:(.+?)@)?(.+)(\?)?$/.exec(frag);
            if (!r) {
              return frag;
            }
            argn.push(r[1]);
            return "(" + r[2] + ")" + (r[3] || '');
          default:
            return frag;
          }
        });
        re = new RegExp(re);
        return {
          re: re,
          argn: argn,
          name: name
        };
      }
    });
    x0$ = app = window.a = new Router();
    x0$.routeN('#@.*#', function(){
      return app.replace('home');
    });
    for (i$ = 0, len$ = (ref$ = ['fightrank', 'maze', 'friend', 'gvg', 'boss', 'salary', 'thief', 'my/deck', 'my/card', 'my/rune', 'my/localdeck', 'home']).length; i$ < len$; ++i$) {
      name = ref$[i$];
      x0$.routeN(name, login(page(name)));
    }
    x0$.routeN('account', page('account'));
    x1$ = app.main = new MainView({
      el: document.body
    });
    x1$.once('$J:render:full:done', function(){
      return Backbone.history.start();
    });
    x1$.render();
    if (typeof window.__defineGetter__ == 'function') {
      window.__defineGetter__('contentView', function(){
        return app.main._subviews['#body'][0];
      });
    }
    function page(name){
      return function(args){
        return require(["view/page/" + name], function(pageView){
          var page, this$ = this;
          app.main.loadin();
          page = new pageView({
            args: args
          });
          if (!app.main._sync.me && app.me) {
            app.main.sync('me', app.me);
          }
          page.renderElement().then(function(){
            return app.main.highlightHash("#" + name);
          });
          return _.result(page, 'renderPromise').then(function(){
            app.main.loadout();
            return app.main.setView('#body', page);
          });
        });
      };
    }
    function login(fn){
      return function(args){
        if (app.me) {
          return fn.apply(null, args);
        } else {
          return app.go('account');
        }
      };
    }
    return app;
  });
}).call(this);
