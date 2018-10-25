import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';

const traceListTemplate  = require('./components/traceList/traceList.html');
const ElasticsearchService  = require('./services/elasticsearchService');
const traceListController  = require('./components/traceList/traceListController');

const callTree = require('./components/callTree/callTreeDirective');
const callTreeController = require('./components/callTree/callTreeController');

const traceGraph = require('./components/traceGraph/traceGraphDirective');
const traceGraphController = require('./components/traceGraph/traceGraphController');

const app = uiModules.get('apps/stagemonitorKibana6');

app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
}]);
app.config(['stateManagementConfigProvider', function (stateManagementConfigProvider) {
  stateManagementConfigProvider.disable();
}]);
app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);

uiRoutes.enable();
uiRoutes
  .when('/trace/:traceId', {
    template: traceListTemplate,
    controller: 'traceListController',
    controllerAs: 'ctrl'
  })
  .otherwise({
    template: traceListTemplate,
    controller: 'traceListController',
    controllerAs: 'ctrl'
  });

app.service('elasticsearchService', ElasticsearchService)
  .controller('traceListController', traceListController)
  .controller('traceGraphController', traceGraphController)
  .controller('callTreeController', callTreeController)
  .directive('traceGraph', traceGraph)
  .directive('callTree', callTree)
  .run((elasticsearchService) => {
    elasticsearchService.updateTracingVisualizationUrlScriptedField();
  });
