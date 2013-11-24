(function(){
  chrome.app.runtime.onLaunched.addListener(function(){
    return chrome.app.window.create('iframe.html', {
      //frame: 'none',
      resizable: false,
      bounds: {
        width: 800,
        height: 600
      }
    });
  });
}).call(this);
