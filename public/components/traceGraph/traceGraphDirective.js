define(function (require) {

  const traceGraph = require('./traceGraph.html');

  const app = require('ui/modules').get('apps/stagemonitorKibana6');

  app.directive('traceGraph', function () {
    return {
      template: traceGraph,
      restriction: 'E',
      scope: {
        trace: '='
      }
    };
  });
});