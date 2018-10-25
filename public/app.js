import React from 'react';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';

import 'ui/autoload/styles';
import './less/main.less';
import { Main } from './components/main';

import traceListTemplate from './components/traceList/traceList.html';
import ElasticsearchService from './services/elasticsearchService';
import traceListController from './components/traceList/traceListController';
import callTree from './components/callTree/callTreeDirective';

const traceGraph = require('./components/traceGraph/traceGraphDirective');
const traceGraphController = require('./components/traceGraph/traceGraphController')

const app = uiModules.get('apps/stagemonitorKibana6');

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
});
app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

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
  .directive('traceGraph', traceGraph)
  .directive('callTree', callTree)
  .run((elasticsearchService) => {
    elasticsearchService.updateTracingVisualizationUrlScriptedField();
  });

/*function RootController($scope, $element, $http) {
  const domNode = $element[0];

  // render react to DOM
  render(<Main title="stagemonitor" httpClient={$http} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('stagemonitorKibana6', RootController);*/
