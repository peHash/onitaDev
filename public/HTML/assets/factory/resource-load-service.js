
+function () {

    angular
    .module('appLab')
    .factory('ResourceLoaderService', ['$q', '$document', '$timeout', resourceLoaderService]);

    function resourceLoaderService($q, $document, $timeout) {

        var document = $document[0],
            service = {},
            promises = {};

        service.load = load;
        service.loadJs = loadJs;
        service.loadCss = loadCss;
        service.unloadCss = unloadCss;

        return service;


        function loadJs(url) {
            return loader(createScriptElement)(url);
        }

        function unloadCss(url) {
          delete promises[url];
          var docHead = document.head;
          if(docHead) {
            var targetCss = docHead.querySelector('[href="' + url + '"]');
            if(targetCss) {
              targetCss.remove();
              return true;
            }
          }
          return false;
        }

        function loadCss(url) {
            var docHead = document.head;
            if(docHead) {
              var targetCss = docHead.querySelector('[href="' + url + '"]');
              if (targetCss) {
                return true;
              } else {
                return loader(createCssLinkElement)(url);
              }
            }
        }

        function load(urls) {
            return $q.all(urls.map(function (url) {
                if (isCss(url)) {
                    return loadCss(url);
                }
                if (isJs(url)) {
                    return loadJs(url);
                }
            }));
        }

        function isCss(url) {
            return url.indexOf('.css') > -1;
        }

        function isJs(url) {
            return url.indexOf('.js') > -1;
        }

        function loader(createElementFn) {
            return function (url) {
                if (typeof promises[url] === 'undefined') {
                    promises[url] = createPromise(url);
                }

                return promises[url];
            };

            function createPromise(url) {
                var defer = $q.defer(),
                    element = createElementFn(url);

                element.onload = element.onreadystatechange = function (e) {
                    $timeout(function () {
                        defer.resolve(e);
                    });
                };

                element.onerror = function (e) {
                    $timeout(function () {
                        defer.reject(e);
                    });
                };

                return defer.promise;
            }
        }

        function createScriptElement(src) {
            var script = document.createElement('script');
            script.src = src;
            document.body.appendChild(script);
            return script;
        }

        function createCssLinkElement(href) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            document.head.firstChild.prepend(link);
            return link;
        }
    }
}();
