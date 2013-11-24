var require = {
  "shim": {
    "backbone.joint": {
      deps: ["backbone"]
    },
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },
    bootstrap: {
      deps: ["jquery"]
    },
    bootbox : {
      exports: "bootbox"
    },
    "dust-runtime" : {
      exports: "dust"
    },
    "dust-helpers" : {
      deps: ["dust-runtime"]
    }
  },
  // paths: {
  //   lodash: "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.2.1/lodash.min",
  //   jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min",
  //   backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min",
  //   bootstrap: "//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min",
  //   "dust-runtime": "//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.0.0/dust-core.min",
  //   "socket.io": "//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min"

  // },
  baseUrl: 'js/'
};


if(chrome && chrome.storage && chrome.storage.local) {
  Object.defineProperty(window, 'localStorage', {value: chrome.storage.local})
}