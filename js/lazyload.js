(function() {
  var scripts = [].slice.call(document.querySelectorAll('script[data-lazyload]'));
  var styles = [].slice.call(document.querySelectorAll('link[data-lazyload]'));
  var elements = scripts.concat(styles);
  var intersectionObserver = ('IntersectionObserver' in window);

  function loadScript(element) {
    var src = element.getAttribute('data-lazyload');
    if (element.tagName === 'SCRIPT') {
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      element.parentNode.replaceChild(script, element);
    } else if (element.tagName === 'LINK') {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      element.parentNode.replaceChild(link, element);
    }
  }

  if (intersectionObserver) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var element = entry.target;
          loadScript(element);
          observer.unobserve(element);
        }
      });
    });
    elements.forEach(function(element) {
      observer.observe(element);
    });
  } else {
    elements.forEach(function(element) {
      loadScript(element);
    });
  }
})();
